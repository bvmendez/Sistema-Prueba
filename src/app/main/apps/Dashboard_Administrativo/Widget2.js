/* eslint-disable camelcase */
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';

const Widget2 = ({ reports }) => {
  return (
    <Paper className="w-full rounded-20 shadow flex flex-col justify-between">
      <div className="flex items-center justify-between px-4 pt-8">
        <IconButton aria-label="more" size="large">
          <Icon>supervised_user_circle</Icon>
        </IconButton>
      </div>
      <div className="text-center py-12">
        <Typography className="text-72 font-semibold leading-none text-red tracking-tighter">
          2
        </Typography>
        <Typography className="text-18 font-normal text-red-800">
         TITULO DE ALGO 
        </Typography>
      </div>
      <Typography
        className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium"
        color="textSecondary"
      />
    </Paper>
  );
};

export default memo(Widget2);
