import React from "react";
import { Button, Box } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CSVLink } from 'react-csv';
import dayjs from "dayjs";

//https://www.npmjs.com/package/react-csv
//trainings
export default function ExportTrainingData(props) {
    const { trainings } = props;

    const filterColumns = () => {
        return trainings.map(training => {
            return {
                activity: training.activity,
                duration: training.duration,
                time: formatDate(training.date),
                client: training.customerLastName + " " + training.customerFirstName,
            };
        });
    };

    const formatDate = (date) => {
        return dayjs(date).format('DD.MM.YYYY HH:mm');
    };

    const filteredTrainings = filterColumns(trainings);

    return (
        <Box sx={{ margin: 2, display: 'flex', placeContent: 'flex-end' }}>
            <CSVLink
                data={filteredTrainings}
                filename={"trainings.csv"}
                className="btn btn-primary"
                target="_blank"
            >
                <Button size='small' variant='contained' sx={{}}>

                    <FileDownloadIcon />
                </Button>
            </CSVLink>
        </Box>
    )

}