/* eslint import/no-extraneous-dependencies: off */
import { createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import history from '@history';
import _ from '@lodash';
import { setInitialSettings, setDefaultSettings } from 'app/store/fuse/settingsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import jwtService from 'app/services/jwtService';

export const setUserDataAuth0 = (tokenData) => async (dispatch) => {
  const user = {
    role: ['admin'],
    from: 'auth0',
    data: {
      displayName: tokenData.username || tokenData.name,
      photoURL: tokenData.picture,
      email: tokenData.email,
      settings:
        tokenData.user_metadata && tokenData.user_metadata.settings
          ? tokenData.user_metadata.settings
          : {},
      shortcuts:
        tokenData.user_metadata && tokenData.user_metadata.shortcuts
          ? tokenData.user_metadata.shortcuts
          : [],
    },
  };

  return dispatch(setUserData(user));
};

export const setUserDataFirebase = (user, authUser) => async (dispatch) => {
  if (
    user &&
    user.data &&
    user.data.settings &&
    user.data.settings.theme &&
    user.data.settings.layout &&
    user.data.settings.layout.style
  ) {
    // Set user data but do not update
    return dispatch(setUserData(user));
  }

  // Create missing user settings
  return dispatch(createUserSettingsFirebase(authUser));
};

export const createUserSettingsFirebase = (authUser) => async (dispatch, getState) => {
  const guestUser = getState().auth.user;
  const fuseDefaultSettings = getState().fuse.settings.defaults;
  const { currentUser } = firebase.auth();

  /**
   * Merge with current Settings
   */
  const user = _.merge({}, guestUser, {
    uid: authUser.uid,
    from: 'firebase',
    role: ['admin'],
    data: {
      displayName: authUser.displayName,
      email: authUser.email,
      settings: { ...fuseDefaultSettings },
    },
  });
  currentUser.updateProfile(user.data);

  dispatch(updateUserData(user));

  return dispatch(setUserData(user));
};

export const setUserData = (user) => async (dispatch, getState) => {
  /* Nota: si usted necesita   hacer una validación y poder redirigir a una ruta en especifica de cada usuario dependiendo del role 
 , la validación se hace de la siguiente manera:  */
  //   if (user.role[0] === 'Administrador') {
  //     history.push({ pathname: 'Menu_admin' });
  //   } else if (user.role[0] === 'Seguimiento') {
  //     history.push({ pathname: 'Dashboard_Seguimiento' });
  //   } else if (user.role[0] === 'Departamental') {
  //     history.push({ pathname: 'Dashboard_Departamental' });
  //   } else if (user.role[0] === 'Denunciante') {
  //     history.push({ pathname: 'compact' });
  //   }

  // si tiene la validación que se encuentra en la parte de arriba elimine la linea 89 (ya no la necesitará si tiene una validación)
  history.push({ pathname: 'apps/Dashboard_Administrativo/Dashboard_admin' });
  /*
  Set User Settings
  */
  dispatch(setDefaultSettings(user.data.settings));

  dispatch(setUser(user));
};

export const updateUserSettings = (settings) => async (dispatch, getState) => {
  const oldUser = getState().auth.user;
  const user = _.merge({}, oldUser, { data: { settings } });

  dispatch(updateUserData(user));

  return dispatch(setUserData(user));
};

export const updateUserShortcuts = (shortcuts) => async (dispatch, getState) => {
  const { user } = getState().auth;
  const newUser = {
    ...user,
    data: {
      ...user.data,
      shortcuts,
    },
  };

  dispatch(updateUserData(newUser));

  return dispatch(setUserData(newUser));
};

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState().auth;

  if (!user.role || user.role.length === 0) {
    // is guest
    return null;
  }

  history.push({
    pathname: '/',
  });

  jwtService.logout();

  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }

  jwtService
    .updateUserData(user)
    .then(() => {
      dispatch(showMessage({ message: 'User data saved with api' }));
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.message }));
    });
};

const initialState = {
  role: [], // guest
  data: {
    displayName: 'John Doe',
    photoURL: 'assets/images/avatars/Velazquez.jpg',
    email: 'johndoe@withinpixels.com',
    // shortcuts: ["calendar", "mail", "contacts", "todo"],
  },
};

const userSlice = createSlice({
  name: 'auth/user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {},
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
