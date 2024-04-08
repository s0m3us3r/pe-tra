import React, { useState } from 'react';
import { Button, ButtonBase, Dialog, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


export default function DeleteTrainingCellRender(props) {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    const { fetchTrainings, training, setTrainings } = props;
    const [confirm, setConfirm] = useState(false);

    const handleClose = () => {
        setConfirm(false);
    }

    const confirmDeleteTrainingDialogue = () => {
        return (
            <Dialog open={confirm} onClose={handleClose} >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 25 }}>
                    <Typography>Are you sure you want to delete the training</Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 15 }}>
                        <Button aria-label="delete" variant='contained' onClick={() => deleteTraining()} sx={{ margin: 1 }}><Typography>Delete</Typography></Button>
                        <Button aria-label="cancel" variant='contained' onClick={handleClose} sx={{ margin: 1 }}><Typography>Cancel</Typography></Button>
                    </div>
                </div>
            </Dialog>
        );
    };


    const deleteTraining = () => {

        fetch(training._links.training.href, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    fetchTrainings(setTrainings);
                }
            })
            .catch(err => console.error(err));

    };

    return (
        <span>
            <span>{cellValue}</span>&nbsp;
            <ButtonBase aria-label="Delete Training Button" sx={{ padding: 1 }} onClick={() => setConfirm(true)}>
                <DeleteIcon aria-label="delete" sx={{ fontSize: 'medium', color: 'inherit' }} />
                {/*<Typography sx={{ fontSize: 'small', display: { xs: 'none', md: 'inline' } }}> 
                Delete
                </Typography>*/}
            </ButtonBase>
            {confirm && confirmDeleteTrainingDialogue()}

        </span>
    );
};
