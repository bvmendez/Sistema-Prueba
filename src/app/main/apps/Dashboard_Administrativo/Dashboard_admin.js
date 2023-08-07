/* eslint-disable camelcase */
/* eslint-disable react/jsx-fragments */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Widget1 from './Widget1';
import Widget2 from './Widget2';
import Widget3 from './Widget3';
import Widget4 from './Widget4';

/// /////////////////////////////////////////////

const Menu_admin = (props) => {

  
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div className="flex flex-wrap" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
        <Widget1 />
        <motion.div />
      </motion.div>
      <motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
        <Widget2 />
      </motion.div>
      <motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
        <Widget3 />
      </motion.div>
      <motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
        <Widget4 />
      </motion.div>
    </motion.div>
  );
};

export default Menu_admin;
