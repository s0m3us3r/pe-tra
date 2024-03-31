import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Typography } from "@mui/material";
//components folder
import DateAndTimePicker from "./DateAndTimePicker";
import CustomersMenu from "./CustomersMenu";
import AddCustomer from "./AddCustomer";

//ICONS
import AddIcon from '@mui/icons-material/Add';
import DurationMenu from "./DurationMenu";



export default function AddTraining(props) {
    const { fetchTrainings, fetchCustomers, setTrainings, customers, setAddedEvent } = props;
    const [customerAdded, setCustomerAdded] = useState(false);

    const [training, setTraining] = useState({
        activity: "",
        duration: 30,
        date: new Date(),
        customer: ""
    })

    //Dialogin avaus
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleTrainingClose = () => {
        setOpen(false);
    };

    const customerFromTrainingAdded = () => {
        setCustomerAdded(true);
    };


    //käsittely
    const handleInputChange = (e) => {
        setTraining({ ...training, [e.target.name]: e.target.value })
    }

    const handleDateTimeChange = (date) => {
        setTraining({ ...training, date });
    };

    const handleCustomerChange = (value) => {
        setTraining({ ...training, customer: value });
    };

    const requiredTrainingFieldsCheck = () => {
        if (
            training.activity.trim() !== '' &&
            typeof training.duration === 'number' && training.duration > 0 &&
            training.date &&
            training.customer 
        ) {
            return true;
        }
        return false;
    }

    //API
    const saveTraining = () => {
        if (requiredTrainingFieldsCheck()) {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(training)
            })
            .then((res) => {
                fetchTrainings(setTrainings);
                if (setAddedEvent) {
                    setAddedEvent(true);
                }
                setOpen(false);
            })
            .catch((err) => console.error(err));
        }
    };

    return (
        <>
            <React.Fragment>
                <Button size='small' variant='outlined' onClick={handleClickOpen}>
                    <Typography sx={{ fontSize: 'small', display: { xs: 'none', md: 'initial' } }}>Add Training</Typography>
                    <AddIcon sx={{ display: { xs: 'small', md: 'none' } }} />
                </Button>
                <Dialog
                    open={open}
                    onClose={handleTrainingClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                        },
                    }}
                >
                    <DialogContent>
                        <TextField
                            autoFocus
                            aria-required
                            name="activity"
                            required
                            value={training.activity}
                            onChange={e => handleInputChange(e)}
                            label="Activity"
                            fullWidth
                            variant="standard"
                            sx={{ mb: 2 }}
                        />
                        <DurationMenu
                            label="Duration (minutes)"
                            required
                            duration={training.duration}
                            handleInputChange={handleInputChange}
                        />

                        <DateAndTimePicker
                            label="Date & Time"
                            required
                            value={training.date}
                            onChange={handleDateTimeChange}
                        />

                        <CustomersMenu
                            label="Customer"
                            required
                            handleCustomerChange={handleCustomerChange}
                            setOpen={setOpen}
                            fetchCustomers={fetchCustomers}
                            customerFromTrainingAdded={customerFromTrainingAdded}
                        />
                        <AddCustomer
                            fetchCustomers={fetchCustomers}
                            customerFromTrainingAdded={customerFromTrainingAdded}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleTrainingClose}>Cancel</Button>
                        <Button onClick={saveTraining} type="save">Save</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    );

}