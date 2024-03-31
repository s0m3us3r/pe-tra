import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function DurationMenu({ duration, handleInputChange, label }) {

    const handleChange = (e) => {
        handleInputChange({
            target: {
                name: 'duration',
                value: e.target.value
            }
        });
    };

    return (
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={duration}
                onChange={handleChange}
                label={label}
            >
                {Array.from({ length: 11 }, (_, index) => {
                    const value = (index + 2) * 15;
                    return <MenuItem key={value} value={value}>{value}</MenuItem>;
                })}

            </Select>
        </FormControl>
    );
}
