import React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers'; 



const DateAndTimePicker = ({ label, value, onChange }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDateTimePicker 
            label={label}
            value={dayjs(value)}
            onChange={onChange}
            slotProps={{ textField: { fullWidth: true, variant: 'outlined' } }}
            format='DD.MM.YYYY HH:mm'
        />
        </LocalizationProvider>
    );
}

export default DateAndTimePicker;