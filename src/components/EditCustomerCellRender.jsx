import React, { useState } from 'react';
import { ButtonBase } from '@mui/material';
import EditCustomer from './EditCustomer';
import EditIcon from '@mui/icons-material/Edit';


export default function EditCustomerCellRender(props) {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    const { customer, fetchCustomers, setCustomers } = props;
    const [editing, setEditing] = useState(false);

    const handleEditClick = () => {
        //console.log("handeling editing")
        //console.log(customer);
        setEditing(true);
    };

    return (
        <>
            <span>{cellValue}</span>&nbsp;
            <ButtonBase aria-label='edit customer' sx={{ padding: 1 }} variant="text" onClick={handleEditClick}>
                <EditIcon sx={{ fontSize: 'medium' }} />
            </ButtonBase>
            {editing && (
                <EditCustomer
                    customer={customer}
                    setEditing={setEditing}
                    fetchCustomers={fetchCustomers}
                    setCustomers={setCustomers} />)}
        </>
    );
};
