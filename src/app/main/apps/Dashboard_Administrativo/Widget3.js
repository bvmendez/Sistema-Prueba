/* eslint-disable camelcase */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { memo, useState, useEffect } from 'react';
import axios from 'axios';

function Widget3(props) {
  return (
    <Paper className="w-full rounded-20 shadow flex flex-col justify-between">
      <div className="flex items-center justify-between px-4 pt-8">
        <IconButton aria-label="more" size="large">
          <Icon>contacts</Icon>
        </IconButton>
      </div>
      <div className="text-center py-12">
        <Typography className="text-72 font-semibold leading-none text-orange tracking-tighter">
          1
        </Typography>
        <Typography className="text-18 font-normal text-orange-800">Titulo de algo</Typography>
      </div>
      <Typography
        className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium"
        color="textSecondary"
      />
    </Paper>
  );
}

export default memo(Widget3);
