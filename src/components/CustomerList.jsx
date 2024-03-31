import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Typography } from "@mui/material";
//component folder imports
import ExportCustomerData from "./ExportCustomerData";
import EditCustomerCellRender from "./EditCustomerCellRender";
import DeleteCustomerCellRender from "./DeleteCustomerCellRender";
import AddCustomer from "./AddCustomer";
//ICONS
import GroupIcon from '@mui/icons-material/Group';


export default function CustomerList(props) {
  const { fetchCustomers } = props;
  const [customers, setCustomers] = useState([]);
  const gridRef = useRef();

  useEffect(() => fetchCustomers(setCustomers), []);

  //https://stackoverflow.com/questions/70363162/ag-grid-concat-fields 
  function nameValueGetter(params) {
    return params.data.lastname + " " + params.data.firstname;
  }
  function addressValueGetter(params) {
    return params.data.postcode + " " + params.data.city;
  }

  //Tools cellrender
  const ButtonsCustomerCellRender = (props) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    const { fetchCustomers, setCustomers } = props;

    return (
      <>
        <span>{cellValue}</span>&nbsp;
        <EditCustomerCellRender 
        customer={props.data} 
        fetchCustomers={fetchCustomers} 
        setCustomers={setCustomers} 
        />
        <DeleteCustomerCellRender 
        customer={props.data} 
        fetchCustomers={fetchCustomers} s
        etCustomers={setCustomers} 
        />
      </>
    );
  };

  const streetAddressSorter = (a, b) => {
    const streetAddressA = extractAlphabets(a).toLowerCase();
    const streetAddressB = extractAlphabets(b).toLowerCase();
    return streetAddressA.localeCompare(streetAddressB);
  };

  const extractAlphabets = (str) => {
    if (!str) return '';
    return str.replace(/^[0-9\s]+/, '');
  };


  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'name',
      headerName: 'Name',
      filter: true,
      floatingFilter: true,
      valueGetter: nameValueGetter,
      flex: 2,
      minWidth: 150,
      sortable: true,
      resizable: true,
    },

    {
      field: 'phone',
      filter: true,
      floatingFilter: true,
      flex: 1,
      minWidth: 125,
    },

    {
      field: 'email',
      filter: true,
      floatingFilter: true,
      flex: 1,
      minWidth: 175,
    },

    {
      field: 'streetaddress',
      filter: true,
      floatingFilter: true,
      headerName: 'Street',
      flex: 2,
      minWidth: 200,
      wrapText: true,
      autoHeight: true,
      comparator: streetAddressSorter,
    },

    {
      field: 'area',
      filter: true,
      floatingFilter: true,
      headerName: 'Area',
      valueGetter: addressValueGetter,
      flex: 2,
      minWidth: 175,
      wrapText: true,
      autoHeight: true,
    },
    {
      headerName: 'Tools',
      editable: false,
      sortable: false,
      cellRenderer: ButtonsCustomerCellRender,
      cellRendererParams: { fetchCustomers, setCustomers },
      width: 150,
    },

  ]);

  const gridOptions = {
    pagination: true,
    paginationAutoPageSize: true,
    //paginationPageSize: 5,
    //paginationPageSizeSelector: [5,10,25,50,100],
  }


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5' align="left" sx={{ pt: 2, pl: 2 }}>
          Customers
          <GroupIcon sx={{ fontSize: 'large', verticalAlign: 'middle', mr: 0.5, ml: 0.5 }} />
        </Typography>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', placeContent: 'flex-end' }}>
          <AddCustomer fetchCustomers={fetchCustomers} setCustomers={setCustomers} />
          <ExportCustomerData customers={customers} />
        </div>

      </div>


      <div className="ag-theme-material" style={{ width: '100%', height: 705 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          rowSelection="single"
          gridOptions={gridOptions}
          ref={gridRef}
          onGridReady={params => gridRef.current = params.api}
          frameworkComponents={{
            deleteCustomerRenderer: DeleteCustomerCellRender,
            editCustomerRenderer: EditCustomerCellRender
          }}
        />
      </div>

    </>
  );
}