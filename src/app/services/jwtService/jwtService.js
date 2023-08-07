import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { setUserData } from "app/auth/store/userSlice";
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (err) => {
                return new Promise((resolve, reject) => {
                    if (
                        err.response.status === 401 &&
                        err.config &&
                        !err.config.__isRetryRequest
                    ) {
                        // if you ever get an unauthorized response, logout the user
                        this.emit("onAutoLogout", "Invalid access_token");
                        this.setSession(null);
                    }
                    throw err;
                });
            }
        );
    };

    handleAuthentication = () => {
        const access_token = this.getAccessToken();

        if (!access_token) {
            this.emit("onNoAccessToken");

            return;
        }

        if (this.isAuthTokenValid(access_token)) {
            this.setSession(access_token);
            this.emit("onAutoLogin", true);
        } else {
            this.setSession(null);
            this.emit("onAutoLogout", "access_token expired");
        }
    };

    createUser = (data) => {
        return new Promise((resolve, reject) => {
            axios.post("/api/auth/register", data).then((response) => {
                if (response.data.user) {
                    this.setSession(response.data.access_token);
                    resolve(response.data.user);
                } else {
                    reject(response.data.error);
                }
            });
        });
    };

    signInWithEmailAndPassword = (username, password) => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify({ username, password });
            axios
                .post("http://127.0.0.1:8000/apiusuarios/login/", body, config)
                .then((response) => {
                    if (response.data.user) {
                        localStorage.setItem("id", response.data.user.data.id);
                        localStorage.setItem("access", response.data.access);
                        this.setSession(
                            response.data.refresh,
                            response.data.user.data.id,
                            response.data.access
                        );
                        setUserData(response.data);
                        resolve(response.data.user);
                    } else {
                        reject(response.data.error);
                    }
                });
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            axios
                .post("http://127.0.0.1:8000/apiusuarios/refresh-token/", {
                    id: window.localStorage.getItem("id"),
                    refresh: this.getAccessToken(),
                    access: this.getToken(),
                })
                .then((response) => {
                    if (response.data.user) {
                        localStorage.setItem("id", response.data.user.data.id);
                        localStorage.setItem("access", response.data.access);
                        this.setSession(
                            response.data.refresh,
                            response.data.user.data.id
                        );
                        setUserData(response.data.user);
                        resolve(response.data.user);
                    } else {
                        this.logout();
                        reject(
                            new Error(
                                "No se pudo cargar la información del usuario."
                            )
                        );
                    }
                })
                .catch((error) => {
                    this.logout();
                    reject(
                        new Error(
                            "No se pudo cargar la información del usuario."
                        )
                    );
                });
        });
    };

    updateUserData = (user) => {
        return axios.post("/api/auth/user/update", {
            user,
        });
    };

    setSession = (access_token, id) => {
        if (access_token || id) {
            localStorage.setItem("jwt_access_token", access_token);
            axios.defaults.headers.common.Authorization = access_token;
        } else {
            localStorage.removeItem("jwt_access_token");
            localStorage.removeItem("id");
            localStorage.removeItem("access");
            delete axios.defaults.headers.common.Authorization;
        }
    };

    logout = () => {
        this.setSession(null);
    };

    isAuthTokenValid = (access_token) => {
        if (!access_token) {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn("access token expired");
            return false;
        }

        return true;
    };

    getAccessToken = () => {
        return window.localStorage.getItem("jwt_access_token");
    };

    getToken = () => {
        if (window.localStorage.getItem("access")) {
            return window.localStorage.getItem("access");
        }
        return 0;
    };
}

const instance = new JwtService();

export default instance;
