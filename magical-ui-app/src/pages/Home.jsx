import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: 'beforeChildren', staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <Box className='magic-container animated-background'>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
<motion.div variants={containerVariants} animate='visible'>
<Typography variant='h2' className='magic-text'>
            Welcome to the Magical UI
          </Typography>
        </motion.div>
        <motion.div variants={itemVariants}>
        <Button variant='contained' className='magic-button' component={motion.a} to='/generate' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
Generate Fake Data
</Button>

        </motion.div>
      </motion.div>
    </Box>
  );
}

export default Home;
