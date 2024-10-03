import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

const PersonCard = ({ person }) => {
  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.02,
        rotate: [0, 1, -1, 0],  // Slight shake animation on hover
        transition: { duration: 0.2 },
      }}
      style={{
        marginBottom: '20px',
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#ffea00',  // Yellow background
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        border: '3px solid #e60000',  // Red border effect
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          style={{
            fontFamily: "'Courier New', monospace",  // Monospace font like the image
            fontWeight: 'bold',
            color: '#000',
          }}
        >
          {person.first_name} {person.last_name}
        </Typography>
        <Typography variant="body1" style={{ color: '#000' }}>
          Gender: {person.gender}
        </Typography>
        <Typography variant="body1" style={{ color: '#000' }}>
          Date of Birth: {person.date_of_birth}
        </Typography>
        <Typography variant="body1" style={{ color: '#000' }}>
          CPR: {person.cpr}
        </Typography>
        <Typography variant="body1" style={{ color: '#000' }}>
          Address: {person.address.street} {person.address.number}, Floor {person.address.floor}, Door {person.address.door}
        </Typography>
        <Typography variant="body1" style={{ color: '#000' }}>
          {person.address.postal_code} {person.address.town}
        </Typography>
        <Typography variant="body1" style={{ color: '#000' }}>
          Phone: {person.phone_number}
        </Typography>
      </CardContent>

      {/* Dynamic glowing effect for card border */}
      <motion.div
        animate={{ boxShadow: ["0 0 10px rgba(230, 0, 0, 0.8)", "0 0 20px rgba(230, 0, 0, 1)", "0 0 10px rgba(230, 0, 0, 0.8)"] }}
        transition={{ duration: 2, yoyo: Infinity }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          border: '2px solid transparent',
          borderRadius: '10px',
        }}
      />
    </Card>
  );
};

const PersonTileList = ({ people }) => (
  <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {people.map((person, index) => (
      <PersonCard key={index} person={person} />
    ))}
  </Box>
);

export default PersonTileList;
