import Card from '@mui/material/Card';
import { styled, darken } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import JWTLoginTab from './tabs/JWTLoginTab';

const Root = styled('div')(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
    theme.palette.primary.dark,
    0.5
  )} 100%)`,
  color: theme.palette.primary.contrastText,

  '& .Login-leftSection': {},

  '& .Login-rightSection': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function Login() {
  const [selectedTab, setSelectedTab] = useState(0);

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  return (
    <Root className="flex flex-col flex-auto items-center justify-center shrink-0 p-16 md:p-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
      >
        <Card
          className="Login-leftSection flex flex-col w-full max-w-sm items-center justify-center shadow-0"
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center mb-48">
                <img
                  className="logo-icon w-50 h-48 center"
                  src="assets/images/logos/logoseduc.svg"
                  alt="logoseduc"
                />
                <div className="border-l-1 mr-4 w-1 h-40" />
                <div>
                  <Typography className="text-24 font-semibold logo-text" color="inherit">
                    Secretaría de
                  </Typography>
                  <Typography
                    className="text-16 tracking-widest -mt-8 font-700"
                    color="textSecondary"
                  >
                    Educación de Honduras
                  </Typography>
                </div>
              </div>
            </motion.div>

            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="fullWidth"
              className="w-full mb-32"
            />
            {selectedTab === 0 && <JWTLoginTab />}
          </CardContent>

          <div className="flex flex-col items-center justify-center pb-32">
            <Link className="font-normal mt-8" to="/Landing">
              Regresar a la pagina de inicio
            </Link>
          </div>
        </Card>

        <div className="Login-rightSection hidden md:flex flex-1 items-center justify-center p-64">
          <div className="max-w-320">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.2 },
              }}
            >
              <Typography variant="h3" color="inherit" className="font-semibold leading-tight">
                Bienvenido <br />
                de nuevo al <br /> Sistema!
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <Typography variant="subtitle1" color="inherit" className="mt-32">
                Ingrese sus datos para el inicio de sesión en la aplicación.
              </Typography>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Root>
  );
}

export default Login;
