import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const SavedPlans = () => {
  const [savedPlans, setSavedPlans] = useState([]);

  useEffect(() => {
    // Fetch saved tax plans from backend
    fetch('/api/saved-plans') // Replace with actual backend endpoint
      .then(response => response.json())
      .then(data => setSavedPlans(data));
  }, []);

  const handleDeletePlan = (id) => {
    fetch(`/api/delete-plan/${id}`, { method: 'DELETE' }) // Replace with actual endpoint
      .then(() => {
        setSavedPlans(savedPlans.filter(plan => plan.id !== id));
      });
  };

  return (
    <Container component={Paper} elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>Saved Tax Plans</Typography>
      {savedPlans.length > 0 ? (
        <Grid container spacing={3}>
          {savedPlans.map(plan => (
            <Grid item xs={12} md={6} key={plan.id}>
              <Paper style={{ padding: '20px', marginBottom: '20px' }}>
                <Typography variant="h6">
                  {plan.year} Plan for {plan.name}: ₹{plan.calculatedTax.toFixed(2)}
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeletePlan(plan.id)}
                  style={{ marginTop: '10px' }}
                >
                  Delete
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No saved plans available.</Typography>
      )}
    </Container>
  );
};

export default SavedPlans;
