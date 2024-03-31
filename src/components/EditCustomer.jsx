
import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function EditCustomer(props) {
    const { customer, setEditing, fetchCustomers, setCustomers } = props;
    const [editedCustomer, setEditedCustomer] = useState(customer)
    const [open, setOpen] = React.useState(true);


    const handleInputChange = (e) => {
        setEditedCustomer({ ...editedCustomer, [e.target.name]: e.target.value })
        //console.log(editedCustomer)
    }

    const handleClose = () => {
        setOpen(false)
        setEditing(false);
    };

    const requiredEditedCustomerFieldsCheck = () => {
        if (
            editedCustomer.firstname.trim() === "" ||
            editedCustomer.lastname.trim() === "" ||
            editedCustomer.phone.trim() === ""
        ) {
            return false;
        }
        return true;
    }

    const saveEdit = () => {
        //console.log('Edited Customer:', editedCustomer);
        if (requiredEditedCustomerFieldsCheck()) {
            fetch(editedCustomer._links.customer.href, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedCustomer)
            })
                .then(res => {
                    if (res.ok) {
                        //console.log('customer edited')
                        fetchCustomers(setCustomers)
                        handleClose();
                    }
                })
                .catch(err => console.error(err));
        }
    }

    return (
        <>
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
                    <DialogTitle>Edit Client information</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            name="firstname"
                            value={editedCustomer.firstname}
                            onChange={e => handleInputChange(e)}
                            label="firstname"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            name="lastname"
                            value={editedCustomer.lastname}
                            onChange={e => handleInputChange(e)}
                            label="lastname"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            name="phone"
                            value={editedCustomer.phone}
                            onChange={e => handleInputChange(e)}
                            label="phone"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            value={editedCustomer.email}
                            onChange={e => handleInputChange(e)}
                            label="email"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="streetaddress"
                            value={editedCustomer.streetaddress}
                            onChange={e => handleInputChange(e)}
                            label="street"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="postcode"
                            value={editedCustomer.postcode}
                            onChange={e => handleInputChange(e)}
                            label="postcode"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="city"
                            value={editedCustomer.city}
                            onChange={e => handleInputChange(e)}
                            label="city"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={saveEdit} type="edit">Edit</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    );

}