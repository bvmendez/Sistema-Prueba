import { authRoles } from 'app/auth';

const navigationConfig = [
  {
    id: 'applications',
    title: 'Menú',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'Dashboard_Administrativo',
        title: 'Panel Principal',
        type: 'item',
        icon: 'dashboard',
        url: 'apps/Dashboard_Administrativo/Dashboard_admin', // Mantener esta nomenclatura de ruta para cumplir con las politicas de buenas practicas
        auth: authRoles.administrador, // Se declara aqui al igual que el archivo de configuración de cada componente
      },
    ],
  },
];

export default navigationConfig;
