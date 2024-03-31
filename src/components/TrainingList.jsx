import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Typography } from "@mui/material";
import dayjs from 'dayjs';
//components folder imports
import ExportTrainingData from "./ExportTrainingData";
import AddTraining from "./AddTraining";
import DeleteTrainingCellRender from './DeleteTrainingCellRender'; 
import EditTrainingCellRender from './EditTrainingCellRender';
//ICONS
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';


export default function TrainingList(props) {
  const { fetchTrainings, fetchCustomers } = props;
  const [trainings, setTrainings] = useState([]);
  const gridRef = useRef();

  //API
  useEffect(() => {
    fetchTrainings(setTrainings);
  }, []);

  //Date sorting https://medium.com/@vishakha.roy2020/ag-grid-react-date-sorting-babeb2cd6675
  const dateComparator = (date1, date2) => {
    const date1Number = Date.parse(date1);
    const date2Number = Date.parse(date2);

    if (date1Number === date2Number) {
      return 0;
    }
    if (date1Number == null) {
      return -1;
    }
    if (date2Number == null) {
      return 1;
    }

    return date1Number - date2Number;
  }

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return dayjs(parsedDate).format('DD.MM.YYYY HH:mm');
  }

  const unformattedDateForSorting = (params) => {
    return params.data.date;
  }

  const formattedDateRenderer = (params) => {
    return formatDate(params.value);
  }

  //Edit&delete CellRender
const ButtonsTrainingCellRender = (props) => {
    const cellValue = props.value;
    const { fetchTrainings, setTrainings, fetchCustomers } = props;

    return (
      <>
        <span>{cellValue}</span>&nbsp;
        <EditTrainingCellRender
          training={props.data}
          fetchTrainings={fetchTrainings}
          setTrainings={setTrainings}
          fetchCustomers={fetchCustomers}
        />
        <DeleteTrainingCellRender
          training={props.data}
          fetchTrainings={fetchTrainings}
          setTrainings={setTrainings}
        />
      </>
    );
  };

  function nameValueGetter(params) {
    return params.data.customerLastName + " " + params.data.customerFirstName;
  }

  //rakenne
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'activity',
      filter: true,
      floatingFilter: true,
      sortable: true,
      resizable: true,
      flex: 2,
      minWidth: 150,
    },

    {
      field: 'duration',
      headerName: 'Duration(m)',
      filter: true,
      floatingFilter: true,
      resizable: true,
      flex: 1,
      minWidth: 75,
    },

    {
      field: 'date',
      headerName: 'Time',
      filter: true,
      floatingFilter: true,
      resizable: true,
      flex: 2,
      minWidth: 150,
      //
      comparator: dateComparator,
      valueGetter: unformattedDateForSorting,
      cellRenderer: formattedDateRenderer,
    },
    {
      field: '_links.customer.href',
      filter: true,
      floatingFilter: true,
      headerName: 'Client',
      flex: 2,
      valueGetter: nameValueGetter,
      resizable: true,
      minWidth: 150,
    },
    {
      headerName: 'Tools',
      editable: false,
      sortable: false,
      cellRenderer: ButtonsTrainingCellRender,
      cellRendererParams: { fetchTrainings, setTrainings, fetchCustomers },
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
          Trainings
          <SportsMartialArtsIcon sx={{ fontSize: 'large', verticalAlign: 'middle', mr: 0.5, ml: 0.5 }} />
        </Typography>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', placeContent: 'flex-end' }}>
          <AddTraining fetchTrainings={fetchTrainings} fetchCustomers={fetchCustomers} setTrainings={setTrainings} />
          <ExportTrainingData trainings={trainings} />
        </div>
      </div>


      <div className="ag-theme-material" style={{ width: '100%', height: 700 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          rowSelection="single"
          gridOptions={gridOptions}
          ref={gridRef}
          onGridReady={params => gridRef.current = params.api}
          frameworkComponents={{
            buttonsTrainingCellRender: ButtonsTrainingCellRender
          }}
        />
      </div>

    </>
  );
}