import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavigationBar from './NavigationBar';

function DisplayAll() {
  const [patientlist, setPatientList] = useState([]);

  //Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    axios.get('http://localhost:4500/patient')
      .then(response => {
        console.log(response.data)
        setPatientList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  function viewPatientList() {
    return patientlist.map((currentrow, index) => {
      return (
        <tr key={index}>
          <td>{currentrow.patientname}</td>
          <td>{currentrow.patientemail}</td>
          <td>{currentrow.patientmobile}</td>
          <td>{currentrow.patientdob}</td>
          <td>{currentrow.patientgender}</td>
          {/* <td>{currentrow.patientcountry}</td> */}
          <td>{currentrow.patientaddress}</td>
        </tr>
      );
    });
  }

  return (
    <div>
      <NavigationBar />
      <br />
      <h3>ALL PATIENT DETAILS</h3>
      <table border="1" align="center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>DOB</th>
            <th>Gender</th>
            {/* <th>Country</th> */}
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {viewPatientList()}
        </tbody>
      </table>
    </div>
  )
}


export default DisplayAll