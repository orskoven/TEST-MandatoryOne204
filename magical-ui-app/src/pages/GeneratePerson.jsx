import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

function GeneratePerson() {
  const [personData, setPersonData] = useState(null);
  const [bulkCount, setBulkCount] = useState(2);
  const [bulkData, setBulkData] = useState(null);

  const fetchPersonData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/person');
      setPersonData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBulkData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/persons/${bulkCount}`
      );
      setBulkData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className='magic-container'>
      <Typography variant='h4' gutterBottom>
        Generate Fake Person Data
      </Typography>
      <Button
        variant='contained'
        className='magic-button'
        onClick={fetchPersonData}
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Generate Single Person
      </Button>

      {personData && (
        <Card
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: '20px', width: '80%' }}
        >
          <CardContent>
            <Typography variant='h5'>
              {personData.first_name} {personData.last_name}
            </Typography>
            <Typography variant='body1'>Gender: {personData.gender}</Typography>
            <Typography variant='body1'>
              Date of Birth: {personData.date_of_birth}
            </Typography>
            <Typography variant='body1'>CPR: {personData.cpr}</Typography>
            <Typography variant='body1'>
              Address: {personData.address.street} {personData.address.number},{' '}
              Floor {personData.address.floor}, Door {personData.address.door}
            </Typography>
            <Typography variant='body1'>
              {personData.address.postal_code} {personData.address.town}
            </Typography>
            <Typography variant='body1'>
              Phone: {personData.phone_number}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Box
        component={motion.div}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '40px', width: '80%' }}
      >
        <Typography variant='h5' gutterBottom>
          Generate Bulk Data
        </Typography>
        <TextField
          type='number'
          label='Number of Persons (2-100)'
          value={bulkCount}
          onChange={(e) => setBulkCount(e.target.value)}
          inputProps={{ min: 2, max: 100 }}
          style={{ marginRight: '20px' }}
        />
        <Button
          variant='contained'
          className='magic-button'
          onClick={fetchBulkData}
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Generate Bulk Data
        </Button>
      </Box>

      {bulkData && (
        <Box style={{ marginTop: '20px', width: '80%' }}>
          {bulkData.map((person, index) => (
            <Card
              key={index}
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '20px' }}
            >
              <CardContent>
                <Typography variant='h5'>
                  {person.first_name} {person.last_name}
                </Typography>
                <Typography variant='body1'>Gender: {person.gender}</Typography>
                <Typography variant='body1'>
                  Date of Birth: {person.date_of_birth}
                </Typography>
                <Typography variant='body1'>CPR: {person.cpr}</Typography>
                <Typography variant='body1'>
                  Address: {person.address.street} {person.address.number},{' '}
                  Floor {person.address.floor}, Door {person.address.door}
                </Typography>
                <Typography variant='body1'>
                  {person.address.postal_code} {person.address.town}
                </Typography>
                <Typography variant='body1'>
                  Phone: {person.phone_number}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default GeneratePerson;
