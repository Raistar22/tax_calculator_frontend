import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Welcome to the Tax App</Typography>
      <div style={{ marginTop: '20px' }}>
        <Link to="/tax-form">
          <Button variant="contained" color="primary">Go to Tax Form</Button>
        </Link>
        <Link to="/saved-plans" style={{ marginLeft: '10px' }}>
          <Button variant="contained" color="secondary">View Saved Plans</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
