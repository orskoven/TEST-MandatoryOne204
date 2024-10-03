import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  return (
    <AppBar
      position='static'
      color='transparent'
      elevation={0}
      component={motion.div}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      <Toolbar>
        <Typography variant='h6' style={{ flexGrow: 1 }}>
          Magical UI
        </Typography>
        <Button color='primary' component={Link} to='/'>
          Home
        </Button>
        <Button color='primary' component={Link} to='/generate'>
          Generate
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
