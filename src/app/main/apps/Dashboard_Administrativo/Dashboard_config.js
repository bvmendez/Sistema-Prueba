/* eslint-disable camelcase */
/* eslint-disable react/jsx-pascal-case */
import { authRoles } from 'app/auth';
import { lazy } from 'react';

const Dashboard_admin = lazy(() => import('./Dashboard_admin'));

const Dashboard_config = {
  settings: {
    layout: {
      config: {},
    },
  },
  // si usted quiere proteger una ruta tiene que declararlo en el componente de configuracion y en componente de navegación de la aplicación :
  auth: authRoles.administrador,
  routes: [
    {
      path: 'apps/Dashboard_Administrativo/Dashboard_admin',
      element: <Dashboard_admin />,
    },
  ],
};

export default Dashboard_config;
