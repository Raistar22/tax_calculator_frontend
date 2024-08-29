// src/components/TaxPlans.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaxPlans = () => {
    const [taxPlans, setTaxPlans] = useState([]);

    useEffect(() => {
        axios.get('/api/tax-plans/')
            .then(response => setTaxPlans(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/api/tax-plans/${id}/`)
            .then(() => setTaxPlans(taxPlans.filter(plan => plan.id !== id)))
            .catch(error => console.error(error));
    };

    return (
        <div>
            {taxPlans.map(plan => (
                <div key={plan.id}>
                    <h3>{plan.year} - {plan.calculated_tax}</h3>
                    <button onClick={() => handleDelete(plan.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default TaxPlans;
