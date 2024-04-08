import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
//components folder import
import DurationMenu from "./DurationMenu";
import DateAndTimePicker from "./DateAndTimePicker";
import CustomersMenu from "./CustomersMenu";

export default function EditTraining(props) {
    const { training, setEditing, fetchTrainings, setTrainings, fetchCustomers } = props;
    const [editedTraining, setEditedTraining] = useState(training);
    const [open, setOpen] = useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState(training._links.customer.href)
   
    const handleInputChange = (e) => {
        setEditedTraining({ ...editedTraining, [e.target.name]: e.target.value });
    };

    const handleDateTimeChange = (date) => {
        setEditedTraining({ ...editedTraining, date });
    };

    const handleClose = () => {
        setOpen(false);
        setEditing(false);
    };

    const handleCustomerChange = (value) => {
        console.log('handleCustomerChange:',editedTraining)
        setSelectedCustomer(value);
    };

    const requiredEditedTrainingFieldsCheck = () => {
        console.log('field check:',editedTraining)
        if (
            editedTraining.activity.trim() !== '' &&
            typeof editedTraining.duration === 'number' && editedTraining.duration > 0 &&
            editedTraining.date &&
            editedTraining.customerFirstName &&
            editedTraining.customerLastName
        ) {
            return true;
        }
        return false;
    }

    const saveEdit = () => {
        console.log('saveEdit:',editedTraining)
        if(requiredEditedTrainingFieldsCheck()){
        fetch(editedTraining._links.self.href, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedTraining)
        })
            .then(res => {
                if (res.ok) {
                    fetchTrainings(setTrainings);
                    //console.log('edited')
                    handleClose();
                }
            })
            .catch(err => console.error(err));
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                    },
                }}
            >
                <DialogTitle>Edit training session</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        aria-required
                        name="activity"
                        required
                        value={editedTraining.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                        variant="standard"
                        sx={{ mb: 2 }}
                    />
                    <DurationMenu
                        label="Duration (minutes)"
                        required
                        duration={editedTraining.duration}
                        handleInputChange={handleInputChange}
                    />
                    <DateAndTimePicker
                        label="Date & Time"
                        required
                        value={editedTraining.date}
                        onChange={handleDateTimeChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveEdit} type="edit">Edit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
