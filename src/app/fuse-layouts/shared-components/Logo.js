import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge, & > .logo-text': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    // aqui se cambia el logo del barra de navegación retractil
    <Root className="flex  mt-20">
      <img
        className="h-90 w-90 mx-auto"
        src="assets/images/logos/seducblanco.svg"
        alt="logo_oficial"
      />
    </Root>
  );
}

export default Logo;
