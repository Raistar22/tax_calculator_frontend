import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import TaxForm from './pages/TaxForm';
import SavedPlans from './pages/SavedPlans';
import './styles/App.css'; // Import your CSS file

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tax-form" element={<TaxForm />} />
        <Route path="/saved-plans" element={<SavedPlans />} />
      </Routes>
    </div>
  );
}

export default App;
