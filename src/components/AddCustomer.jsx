import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export default function AddCustomer(props) {
    const { fetchCustomers, setCustomers, customerFromTrainingAdded } = props;
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",
    })


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const handleInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }


    const requiredCustomerFieldsCheck = () => {
        if (
            customer.firstname.trim() === "" ||
            customer.lastname.trim() === "" ||
            customer.phone.trim() === ""
        ) {
            return false;
        }
        return true;
    }


    const addCustomer = () => {

        if (requiredCustomerFieldsCheck()) {
            saveCustomer(customer);
            if (typeof customerFromTrainingAdded === 'function') {
                customerFromTrainingAdded();
            }
            handleClose();
            setOpenSuccess(true);
        }
    }

    const saveCustomer = () => {
        if (requiredCustomerFieldsCheck()){
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer)
            })

            .then(res => fetchCustomers(setCustomers))
            .catch(err => console.error(err))

        console.log('customer saved')
    }
    }

    return (
        <>
            <React.Fragment>
                <Button size='small' variant='outlined' onClick={handleClickOpen}>
                    <Typography sx={{ fontSize: 'small', display: { xs: 'none', md: 'initial' } }}>New Customer</Typography>
                    <PersonAddAlt1Icon sx={{ display: { xs: 'small', md: 'none' } }} />
                </Button>
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
                    <DialogTitle>New client</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            name="firstname"
                            value={customer.firstname}
                            onChange={e => handleInputChange(e)}
                            label="Firstname"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            name="lastname"
                            value={customer.lastname}
                            onChange={e => handleInputChange(e)}
                            label="Lastname"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            name="phone"
                            value={customer.phone}
                            onChange={e => handleInputChange(e)}
                            label="phone"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            value={customer.email}
                            onChange={e => handleInputChange(e)}
                            label="email"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="streetaddress"
                            value={customer.streetaddress}
                            onChange={e => handleInputChange(e)}
                            label="Street"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="postcode"
                            value={customer.postcode}
                            onChange={e => handleInputChange(e)}
                            label="postcode"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="city"
                            value={customer.city}
                            onChange={e => handleInputChange(e)}
                            label="city"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={addCustomer} type="save">Save</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openSuccess}
                    onClose={handleCloseSuccess}
                >
                    <DialogContent>
                        <Typography variant="subtitle1">
                            Customer added successfully: {customer.lastname} {customer.firstname}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseSuccess}>OK</Button>
                    </DialogActions>
                </Dialog>

            </React.Fragment>
        </>
    );

}