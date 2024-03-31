import React from "react";
import { Button, Box } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CSVLink } from 'react-csv';

//https://www.npmjs.com/package/react-csv
//customers:

export default function ExportCustomerData(props) {
    const { customers } = props;
    //console.log(props.customers);

    const filterColumns = () => {
        return customers.map(customer => {
            return {
                name: customer.lastname + " " + customer.firstname,
                phone: customer.phone,
                email: customer.email,
                street_address: customer.streetaddress,
                area: customer.postcode + " " + customer.city
            };
        });
    };

    const filteredCustomers = filterColumns(customers);

    return (
        <Box sx={{ margin: 2, display: 'flex', placeContent: 'flex-end' }}>
            <CSVLink
                data={filteredCustomers}
                filename={"my-customers.csv"}
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