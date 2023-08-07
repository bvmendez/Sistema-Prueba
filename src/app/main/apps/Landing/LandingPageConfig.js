/* eslint-disable react/jsx-pascal-case */
import { authRoles } from 'app/auth';
import { lazy } from 'react';

const LandingPage = lazy(() => import('./LandingPage'));

const LandingPageConfig = {
  settings: {
    layout: {
      config: {
        navbar:{display:false},
        toolbar:{display:false}
      },
    },
  },
  // si usted quiere proteger una ruta tiene que declararlo en el componente de configuracion y en componente de navegación de la aplicación :
//   auth: authRoles.administrador,
  routes: [
    {
      path: 'apps/LandingPage',
      element: <LandingPage />,
    },
  ],
};

export default LandingPageConfig;
