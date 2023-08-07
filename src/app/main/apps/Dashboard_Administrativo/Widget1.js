import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo, useState, useEffect } from 'react';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';


function Widget1(props) {
  

  return (
    <Paper className="w-full rounded-20 shadow flex flex-col justify-between">
      <div className="flex items-center justify-between px-4 pt-8">
        <IconButton aria-label="more" size="large">
          <Icon>format_list_numbered</Icon>
        </IconButton>
      </div>
      <div className="text-center py-12">
        <Typography className="text-72 font-semibold leading-none text-blue tracking-tighter">
          1
        </Typography>
        <Typography className="text-18 text-blue-800 font-normal">Titulo de algo</Typography>
      </div>
      <Typography
        className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium"
        color="textSecondary"
      />
    </Paper>
  );
}

export default memo(Widget1);
