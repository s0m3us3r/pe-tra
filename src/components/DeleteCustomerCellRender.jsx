import React, { useState } from 'react';
import { Button, ButtonBase, Dialog, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


export default function DeleteCustomerCellRender(props) {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    const { fetchCustomers, customer, setCustomers } = props;
    const [confirm, setConfirm] = useState(false);

    const handleClose = () => {
        setConfirm(false);
    }

    const confirmDeleteCustomerDialogue = () => {
        //console.log(customer)
        return (
            <Dialog open={confirm} onClose={handleClose} >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 25 }}>
                    <Typography>Are you sure you want to delete the customer</Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 15 }}>
                        <Button aria-label="delete" variant='contained' onClick={() => deleteCustomer()} sx={{ margin: 1 }}><Typography>Delete</Typography></Button>
                        <Button aria-label="cancel" variant='contained' onClick={handleClose} sx={{ margin: 1 }}><Typography>Cancel</Typography></Button>
                    </div>
                </div>
            </Dialog>
        );
    };


    const deleteCustomer = (props) => {

        fetch(customer._links.customer.href, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    console.log('customer deleted')
                    //alert('Customer deleted');
                    fetchCustomers(setCustomers);
                    handleClose();
                }
            })
            .catch(err => console.error(err));

    };

    return (
        <span>
            <span>{cellValue}</span>&nbsp;
            <ButtonBase sx={{ padding: 1 }} onClick={() => setConfirm(true)}>
                <DeleteIcon aria-label="delete" sx={{ fontSize: 'medium', color: 'inherit' }} />
                {/*<Typography sx={{ fontSize: 'small', display: { xs: 'none', md: 'inline' } }}> 
                Delete
                </Typography>*/}
            </ButtonBase>
            {confirm && confirmDeleteCustomerDialogue()}

        </span>
    );
};