/**
 * Authorization Roles
 */
const authRoles = {
    administrador: ["Administrador"],
    staff: ["Administrador", "seguimiento", "departamental"],
    seguimiento: ["seguimiento"],
    departamental: ["departamental"],
    user: ["denunciante"],
    denunciante: ["denunciante"],
    onlyGuest: [],
};

export default authRoles;
