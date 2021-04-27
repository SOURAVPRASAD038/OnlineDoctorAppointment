import React, { useState } from 'react'
import axios from 'axios'
import NavigationBar from './NavigationBar';

function Search() {
  const [patientlist, setPatientList] = useState([]);
  const [pemail, setPatientEmail] = useState("");
  const [status, setStatus] = useState(false);
  const [msg, setMessage] = useState("");

  const onChangePatientEmail = (p) => {
    setPatientEmail(p.target.value);
    setMessage(''); //REMOVE ERROE MSG
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios.get('http://localhost:4500/patient/search/' + pemail)
      .then(res => {
        console.log(res.data)
        setPatientList(res.data)
        setStatus(true)
      })
      .catch(err => {
        console.log(err)
        setMessage('INVALID EMAIL ID')
      })

    setPatientEmail('')
  }

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

  if (status === false) {
    return (<div>
      <NavigationBar />
      <br />
      <h3>ENTER EMAIL ID FOR SEARCH</h3>
      <b style={{ color: "red" }}>{msg}</b>
      <form onSubmit={handleSubmit}>
        <input type="email" value={pemail}
          onChange={onChangePatientEmail}
          placeholder="EMAIL ID"
          required />
        <br />
        <br />
        <input type="submit" value="SEARCH EMPLOYEE" className="btn btn-success" />
      </form>
    </div>);
  }
  else {
    return (
      <div>
        <NavigationBar />
        <br />
        <h3>ENTER EMAIL ID FOR SEARCH</h3>
        <b>{msg}</b>
        <form onSubmit={handleSubmit}>
          <input type="email" value={pemail}
            onChange={onChangePatientEmail} placeholder="EMAIL ID"
            required />
          <br />
          <br />
          <input type="submit" value="SEARCH EMPLOYEE" className="btn btn-success" />
        </form>
        <br /><br />

        <h3>EMPLOYEE DETAILS</h3>
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
}

export default Search
