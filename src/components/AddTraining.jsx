import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Typography } from "@mui/material";
import dayjs from 'dayjs';
//components folder
import DateAndTimePicker from "./DateAndTimePicker";
import CustomersMenu from "./CustomersMenu";
import AddCustomer from "./AddCustomer";

//ICONS
import AddIcon from '@mui/icons-material/Add';
import DurationMenu from "./DurationMenu";



export default function AddTraining(props) {
    const { fetchTrainings, fetchCustomers, setTrainings, setAddedEvent } = props;
    const [customerAdded, setCustomerAdded] = useState(false);
    const [training, setTraining] = useState({
        activity: "",
        duration: 30,
        date: new Date(),
        customer: "",
        //for successmessage
        firstname: "",
        lastname: ""
    })
    //Dialogit
    const [open, setOpen] = useState(false);
    const [saveTrainingSuccessOpen, setSaveTrainingSuccessOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleTrainingClose = () => {
        setOpen(false);
    };
    const handleSaveTrainingSuccessClose = () => {
        console.log(training);
        setSaveTrainingSuccessOpen(false);
    };
    const customerFromTrainingAdded = () => {
        setCustomerAdded(true);
    };

    //Training listalta tän välittäminen toimi välillä ja välillä ei niin 
    const formatDate = (date) => {
        const parsedDate = new Date(date);
        return dayjs(parsedDate).format('DD.MM.YYYY HH:mm');
    }

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

    //API training+training.customer
    const saveTraining = () => {
        if (requiredTrainingFieldsCheck()) {
            fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(training)
            })
                .then((res) => {
                    if (res.ok) {
                        fetchTrainings(setTrainings);
                        if (setAddedEvent) {
                            setAddedEvent(true);
                        }
                        setOpen(false);
                        setSaveTrainingSuccessOpen(true);

                        fetch(training.customer)
                            .then((response) => response.json())
                            .then((customerData) => {
                                const { firstname, lastname } = customerData;

                                setTraining(prevState => ({ //prevState https://www.valentinog.com/blog/react-object-is/
                                    ...prevState,
                                    firstname: firstname,
                                    lastname: lastname
                                }));
                            })
                            .catch((err) => console.error('Error fetching customer:', err));
                    }
                })
                .catch((err) => console.error('Error adding training:', err));
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

                <Dialog
                    open={saveTrainingSuccessOpen}
                    onClose={handleSaveTrainingSuccessClose}
                >
                    <DialogContent>
                        <Typography variant="subtitle1">
                            Training added successfully: {formatDate(training.date)}, {training.lastname} {training.firstname}, {training.activity} {training.duration} minutes
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSaveTrainingSuccessClose}>OK</Button>
                    </DialogActions>
                </Dialog>

            </React.Fragment>
        </>
    );

}
