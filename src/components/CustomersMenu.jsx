import React, { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function CustomersMenu(props) {
    const { fetchCustomers, handleCustomerChange, label, selectedCustomer, customerFromTrainingAdded } = props;
    const [customers, setCustomers] = useState([]);
    //if from EditTraining selectedcustomer, if not(e.g.from AddTraining) ""
    const [selectedCustomerState, setSelectedCustomerState] = useState(selectedCustomer !== undefined ? selectedCustomer : "");


    useEffect(() => {
        fetchCustomers(setCustomers);
    }, [customerFromTrainingAdded])

    useEffect(() => {
        setSelectedCustomerState(selectedCustomer !== undefined ? selectedCustomer : "");
    }, [selectedCustomer]);

    // Sort customers by name
    const sortedCustomers = [...customers].sort((a, b) => {
        const nameA = `${a.lastname} ${a.firstname}`;
        const nameB = `${b.lastname} ${b.firstname}`;
        return nameA.localeCompare(nameB); //äöå
    });

    const handleMenuClick = (e) => {
        const value = e.target.value;
        setSelectedCustomerState(value);
        handleCustomerChange(value);
    };

    return (
        <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel>{label}</InputLabel>
            <Select
                aria-label="Customer selection"
                labelId="customer-select-label"
                id="customer-select"
                value={selectedCustomerState}
                onChange={handleMenuClick}
                label={label}
            >
                <MenuItem aria-label="Select customer" value="" disabled >
                    Select a customer
                </MenuItem>
                {sortedCustomers.map((customer, index) => (
                    <MenuItem aria-label="Select customer list" key={index} value={`${customer._links.customer.href}`}>
                        {`${customer.lastname} ${customer.firstname}`}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
