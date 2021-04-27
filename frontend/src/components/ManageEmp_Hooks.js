import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavigationBar from './NavigationBar';
import UpdateProfile from './UpdateProfile_Hooks'

function ManagePatient() {
  const [patientlist, setPatientList] = useState([]);
  const [msg, setMessage] = useState("");
  const [status, setStatus] = useState(true);
  const [patientemailid, setPatientEmailId] = useState("");

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
      console.log(index)
      return (
        <tr key={index}>
          <td>{currentrow.patientname}</td>
          <td>{currentrow.patientemail}</td>
          <td>{currentrow.patientmobile}</td>
          <td>{currentrow.patientdob}</td>
          <td>{currentrow.patientgender}</td>
          {/* <td>{currentrow.patientcountry}</td> */}
          <td>{currentrow.patientaddress}</td>
          <td><button onClick={() => removeRow(index)} className="btn btn-danger">Delete</button></td>
          <td><button onClick={() => updateRow(index)} className="btn btn-primary">Update</button></td>
        </tr>
      )
    })
  }

  function removeRow(index) {
    var temppatientlist = [...patientlist]; // make a new copy of array instead of mutating the same array directly. 
    let removerow = temppatientlist.splice(index, 1);
    console.log(removerow[0].patientemail)
    axios.delete('http://localhost:4500/patient/remove/' + removerow[0].patientemail)
      .then(res => {
        console.log(res.data)
        setMessage('SUCCESSFULLY DELETED')
        setPatientList(temppatientlist)
      })
      .catch(err => {
        console.log(err)
        setMessage('INVALID EMAIL ID')
      })
  }

  function updateRow(index) {
    var temppatientlist = [...patientlist]; // make a new copy of array instead of mutating the same array directly. 
    let removerow = temppatientlist.splice(index, 1);
    console.log(removerow[0].patientemail)
    setStatus(false)
    setPatientEmailId(removerow[0].patientemail)
  }

  if (status === true) {
    return (
      <div>
        <NavigationBar />
        <br />
        <h3>PATIENT DETAILS</h3>
        <b style={{ color: "red" }}>{msg}</b>
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
  else {
    return (
      <div>
        <UpdateProfile email={patientemailid} />
      </div>
    )
  }
}

export default ManagePatient
