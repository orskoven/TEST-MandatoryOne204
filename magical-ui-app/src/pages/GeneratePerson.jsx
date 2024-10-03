import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import PersonTileList from '../components/PersonTile';  // Make sure this path points to the correct file

function GeneratePerson() {
  const [personData, setPersonData] = useState(null);
  const [bulkCount, setBulkCount] = useState(2);
  const [bulkData, setBulkData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPersonData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/person');
      setPersonData(response.data);
    } catch (error) {
      setError('Failed to fetch person data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBulkData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/persons/${bulkCount}`
      );
      setBulkData(response.data);
    } catch (error) {
      setError('Failed to fetch bulk data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className='magic-container'>
      <Typography variant='h4' gutterBottom style={{ fontWeight: 'bold', color: '#333' }}>
        Generate Fake Person Data
      </Typography>

      {/* Single Person Generator */}
      <Button
        variant='contained'
        className='magic-button'
        onClick={fetchPersonData}
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ marginBottom: '20px' }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Single Person"}
      </Button>

      {personData && (
        <Card
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            marginTop: '20px',
            width: '100%',
            maxWidth: '600px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffea00',  // Yellow background like the card
            border: '3px solid #e60000',  // Red border
            borderRadius: '10px'
          }}
        >
          <CardContent>
            <Typography variant='h5' style={{ fontFamily: "'Courier New', monospace", fontWeight: 'bold', marginBottom: '10px' }}>
              {personData.first_name} {personData.last_name}
            </Typography>
            <Typography variant='body1' style={{ color: '#000' }}>Gender: {personData.gender}</Typography>
            <Typography variant='body1' style={{ color: '#000' }}>Date of Birth: {personData.date_of_birth}</Typography>
            <Typography variant='body1' style={{ color: '#000' }}>CPR: {personData.cpr}</Typography>
            <Typography variant='body1' style={{ color: '#000' }}>
              Address: {personData.address.street} {personData.address.number}, Floor {personData.address.floor}, Door {personData.address.door}
            </Typography>
            <Typography variant='body1' style={{ color: '#000' }}>
              {personData.address.postal_code} {personData.address.town_name}
            </Typography>
            <Typography variant='body1' style={{ color: '#000' }}>Phone: {personData.phone_number}</Typography>
          </CardContent>
        </Card>
      )}

      {/* Bulk Data Generator */}
      <Box style={{ marginTop: '40px', width: '100%', maxWidth: '600px' }}>
        <Typography variant='h5' gutterBottom>
          Generate Bulk Data
        </Typography>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <TextField
            type='number'
            label='Number of Persons (2-100)'
            value={bulkCount}
            onChange={(e) => setBulkCount(e.target.value)}
            inputProps={{ min: 2, max: 100 }}
            style={{ marginRight: '20px', width: '150px' }}
          />
          <Button
            variant='contained'
            className='magic-button'
            onClick={fetchBulkData}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Bulk Data"}
          </Button>
        </Box>
      </Box>

      {/* Display Bulk Data using PersonTileList */}
      {bulkData && (
        <PersonTileList people={bulkData} />
      )}

      {error && (
        <Typography variant='body1' style={{ color: 'red', marginTop: '20px' }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default GeneratePerson;
