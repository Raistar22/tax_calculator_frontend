import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const TaxForm = () => {
  const [name, setName] = useState('');
  const [income, setIncome] = useState('');
  const [year, setYear] = useState('');
  const [standardDeduction, setStandardDeduction] = useState(50000);
  const [section80C, setSection80C] = useState('');
  const [section80D, setSection80D] = useState('');
  const [otherDeductions, setOtherDeductions] = useState('');
  const [tax, setTax] = useState(null);
  const [taxSlabs, setTaxSlabs] = useState([]);

  const handleCalculateTax = () => {
    // Mock tax slabs
    const slabs = [
      { min: 0, max: 250000, rate: 0 },
      { min: 250001, max: 500000, rate: 0.05 },
      { min: 500001, max: 1000000, rate: 0.2 },
      { min: 1000001, max: Infinity, rate: 0.3 },
    ];
    setTaxSlabs(slabs);

    // Example tax calculation
    let taxableIncome = income - standardDeduction - section80C - section80D - otherDeductions;
    let calculatedTax = 0;

    slabs.forEach(slab => {
      if (taxableIncome > slab.min) {
        const incomeInThisSlab = Math.min(taxableIncome, slab.max) - slab.min;
        calculatedTax += incomeInThisSlab * slab.rate;
      }
    });

    setTax(calculatedTax);
  };

  return (
    <Container component={Paper} elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>Income Tax Calculator</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Income (INR)"
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Standard Deduction"
            value={standardDeduction}
            disabled
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Section 80C (Max ₹1,50,000)"
            type="number"
            value={section80C}
            onChange={(e) => setSection80C(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Section 80D (Medical Insurance)"
            type="number"
            value={section80D}
            onChange={(e) => setSection80D(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Other Deductions"
            type="number"
            value={otherDeductions}
            onChange={(e) => setOtherDeductions(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCalculateTax}
        style={{ marginTop: '20px' }}
      >
        Calculate Tax
      </Button>
      {tax !== null && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">Calculated Tax: ₹{tax.toFixed(2)}</Typography>
        </div>
      )}
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h6">Tax Slabs for {year}</Typography>
        <ul>
          {taxSlabs.map((slab, index) => (
            <li key={index}>
              Income from ₹{slab.min} to ₹{slab.max}: {slab.rate * 100}%
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default TaxForm;
