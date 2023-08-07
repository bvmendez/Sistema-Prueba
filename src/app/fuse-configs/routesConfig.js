/* eslint-disable camelcase */
import { Navigate } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import LoginConfig from 'app/main/login/LoginConfig';
import Dashboard_config from 'app/main/apps/Dashboard_Administrativo/Dashboard_config';
import LandingPageConfig from 'app/main/apps/Landing/LandingPageConfig';

/* aqui se declaran todas las rutas del proyect (tenemos que mandar a llamar al archivo de configuración ) */

const routeConfigs = [LoginConfig, Dashboard_config,LandingPageConfig];

// Tecnicamente estas rutas declaradas no se tendrian que tocar, a excepcion de la primera ya que podemos llamar a nuestra landing (en este caso se llama un login primero)
const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: '/',
    element: <Navigate to="apps/LandingPage" />,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
