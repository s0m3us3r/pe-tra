import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export const fetchTrainings = (setTrainings) => {
  if (setTrainings) {
    fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings')
      .then(response => response.json())
      .then(data => {
        // customers
        Promise.all(data._embedded.trainings.map(training =>
          fetch(training._links.customer.href)
            .then(response => response.json())
            .then(customerData => ({
              ...training,
              customerFirstName: customerData.firstname,
              customerLastName: customerData.lastname
            }))
        ))
          .then(trainingsWithCustomerInfo => {
            setTrainings(trainingsWithCustomerInfo);
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }
};


export const fetchCustomers = (setCustomers) => {
  if (setCustomers) {
    fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
      .then(response => response.json())
      .then(data => {
        setCustomers(data._embedded.customers);
      })
      .catch(err => console.error(err))
  }
}


function App() {

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container style={{ width: '100%' }}>
          <Header />
          <Outlet />
        </Container>

      </LocalizationProvider>
    </div>
  )
}



export default App
