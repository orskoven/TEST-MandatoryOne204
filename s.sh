#!/bin/bash

# Check for Node.js and npm
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Please install it before proceeding."
    exit
fi

if ! command -v npm &> /dev/null
then
    echo "npm is not installed. Please install it before proceeding."
    exit
fi

# Create a new React project with Vite.js
npm create vite@latest magical-ui-app -- --template react

# Navigate into the project directory
cd magical-ui-app

# Install dependencies
npm install

# Install Axios for API communication
npm install axios

# Install Material UI and dependencies
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled

# Install Framer Motion for advanced animations
npm install framer-motion

# Install React Router for routing
npm install react-router-dom

# Install ESLint and Prettier for code quality
npm install -D eslint prettier eslint-plugin-react eslint-plugin-react-hooks eslint-config-prettier eslint-plugin-prettier

# Initialize ESLint configuration
npx eslint --init

# Overwrite .eslintrc.json with custom configuration
cat > .eslintrc.json <<EOL
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["react-app", "eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended", "prettier"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react", "react-hooks", "prettier"],
  "rules": {
    "prettier/prettier": ["error"]
  }
}
EOL

# Create Prettier configuration
cat > .prettierrc <<EOL
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "semi": true
}
EOL

# Remove default styles
rm src/App.css
rm src/index.css

# Create custom CSS with magical styles
cat > src/styles.css <<EOL
body {
  margin: 0;
  padding: 0;
  background: radial-gradient(circle at center, #ffffff, #e0e0e0);
  font-family: 'Poppins', sans-serif;
  color: #333;
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: inherit;
}

.magic-button {
  background-color: #6200ea;
  color: white;
  padding: 15px 30px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.magic-button:hover {
  background-color: #3700b3;
  transform: scale(1.05);
}

.magic-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.magic-text {
  font-size: 48px;
  color: #424242;
  margin-bottom: 20px;
}

@keyframes magicGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animated-background {
  background: linear-gradient(270deg, #ff9a9e, #fad0c4, #fad0c4);
  background-size: 600% 600%;
  animation: magicGradient 16s ease infinite;
}

.fade-in {
  animation: fadeIn 1s ease-in forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
EOL

# Import styles in main.jsx
sed -i '' "1i\\
import './styles.css';\\
" src/main.jsx || sed -i "1iimport './styles.css';" src/main.jsx

# Create src/theme.js for custom Material UI theme
cat > src/theme.js <<EOL
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea',
    },
    secondary: {
      main: '#03dac6',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export default theme;
EOL

# Update main.jsx to include ThemeProvider
cat > src/main.jsx <<EOL
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
EOL

# Create src/App.jsx with enhanced components
cat > src/App.jsx <<EOL
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GeneratePerson from './pages/GeneratePerson';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/generate' element={<GeneratePerson />} />
      </Routes>
    </>
  );
}

export default App;
EOL

# Create a custom font import in index.html
sed -i '' "s/<\/head>/  <link rel='preconnect' href='https:\/\/fonts.googleapis.com'>\n  <link rel='preconnect' href='https:\/\/fonts.gstatic.com' crossorigin>\n  <link href='https:\/\/fonts.googleapis.com\/css2?family=Poppins:wght@300;400;500;700&display=swap' rel='stylesheet'>\n<\/head>/g" index.html || sed -i "s/<\/head>/  <link rel='preconnect' href='https:\/\/fonts.googleapis.com'>\n  <link rel='preconnect' href='https:\/\/fonts.gstatic.com' crossorigin>\n  <link href='https:\/\/fonts.googleapis.com\/css2?family=Poppins:wght@300;400;500;700&display=swap' rel='stylesheet'>\n<\/head>/g" index.html

# Create src/components/Navbar.jsx
mkdir -p src/components
cat > src/components/Navbar.jsx <<EOL
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
EOL

# Create src/pages/Home.jsx
mkdir -p src/pages
cat > src/pages/Home.jsx <<EOL
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
        <motion.div variants={itemVariants}>
          <Typography variant='h2' className='magic-text'>
            Welcome to the Magical UI
          </Typography>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Button
            variant='contained'
            className='magic-button'
            component={Link}
            to='/generate'
            component={motion.a}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Generate Fake Data
          </Button>
        </motion.div>
      </motion.div>
    </Box>
  );
}

export default Home;
EOL

# Create src/pages/GeneratePerson.jsx
cat > src/pages/GeneratePerson.jsx <<EOL
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
      const response = await axios.get('http://localhost:5000/api/person');
      setPersonData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBulkData = async () => {
    try {
      const response = await axios.get(
        \`http://localhost:5000/api/persons/\${bulkCount}\`
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
EOL

# Start the development server
npm run dev
