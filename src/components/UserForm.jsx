// src/components/UserForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem } from '@mui/material';

const UserForm = () => {
    const [name, setName] = useState('');
    const [income, setIncome] = useState('');
    const [year, setYear] = useState('');
    const [deductions, setDeductions] = useState({
        standardDeduction: 50000,
        section80C: 0,
        section80D: 0,
        otherDeductions: 0,
    });
    const [taxSlabs, setTaxSlabs] = useState([]);

    useEffect(() => {
        if (year) {
            axios.get(`/api/tax-slabs/?year=${year}`)
                .then(response => setTaxSlabs(response.data))
                .catch(error => console.error(error));
        }
    }, [year]);

    const handleSubmit = () => {
        // Submit logic here
    };

    return (
        <form>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Income" value={income} onChange={(e) => setIncome(e.target.value)} />
            <Select value={year} onChange={(e) => setYear(e.target.value)}>
                {/* Populate with year options */}
            </Select>
            {/* Deduction input fields */}
            <Button onClick={handleSubmit}>Calculate Tax</Button>
        </form>
    );
};

export default UserForm;

const calculateTax = (income, slabs, deductions) => {
    let tax = 0;
    slabs.forEach(slab => {
        if (income > slab.income_from) {
            const taxableIncome = Math.min(income, slab.income_to || income) - slab.income_from;
            tax += (taxableIncome * slab.tax_rate) / 100;
        }
    });

    const totalDeductions = Object.values(deductions).reduce((acc, curr) => acc + curr, 0);
    tax -= totalDeductions;

    return Math.max(tax, 0); // Ensure tax isn't negative
};

