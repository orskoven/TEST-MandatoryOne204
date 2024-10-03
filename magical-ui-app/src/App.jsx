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
