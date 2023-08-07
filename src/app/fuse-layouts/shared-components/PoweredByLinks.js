import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { motion } from 'framer-motion';

function PoweredByLinks() {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex items-center">
      <Tooltip title="Secretaría de Educación de Honduras" placement="top">
        <IconButton
          className="w-90 h-90 px-4"
          component={motion.a}
          variants={item}
          href="https://www.se.gob.hn/"
          target="_blank"
          rel="noreferrer noopener"
          role="button"
          size="large"
        >
          <img
            src="assets/images/logos/logoseducEscudo.svg"
            alt="seduc.hn"
            width="100"
            height="100"
          />
        </IconButton>
      </Tooltip>
    </motion.div>
  );
}

export default PoweredByLinks;
