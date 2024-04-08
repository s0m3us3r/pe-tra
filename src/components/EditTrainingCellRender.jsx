import React, { useState } from 'react';
import { ButtonBase } from '@mui/material';
import EditTraining from './EditTraining';
import EditIcon from '@mui/icons-material/Edit';


export default function EditTrainingCellRender(props) {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    const { training, fetchTrainings, fetchCustomers, setTrainings} = props;
    const [editing, setEditing] = useState(false);


    const handleEditClick = () => {
        setEditing(true);
    };

    return (
        <>
            <span>{cellValue}</span>&nbsp;
            <ButtonBase aria-label='edit training' sx={{ padding: 1, margin: 0 }} variant="text" onClick={handleEditClick}>
                <EditIcon sx={{ fontSize: 'medium' }} />
            </ButtonBase>
            {editing && (
                <EditTraining
                    training={training}
                    setEditing={setEditing}
                    fetchTrainings={fetchTrainings}
                    fetchCustomers={fetchCustomers}
                    setTrainings={setTrainings}
                />)}
        </>
    );
};
