import React, { useState } from 'react'
import axios from 'axios'
import NavigationBar from './NavigationBar';

function Delete() {
  const [pemail, setPatientEmail] = useState("");
  const [msg, setMessage] = useState("");

  const onChangePatientEmail = (p) => {
    setPatientEmail(p.target.value);
    setMessage(''); //REMOVE ERROE MSG
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //console.log(`Form submitted:`);
    //console.log(`EMAIL ID: ${eemail}`);

    axios.delete('http://localhost:4500/patient/remove/' + pemail)
      .then(res => {
        console.log(res.data)
        setMessage('SUCCESSFULLY DELETED')
      })
      .catch(err => {
        console.log(err)
        setMessage('INVALID EMAIL ID')
      })

    setPatientEmail('')
  }

  return (
    <div>
      <NavigationBar />
      <br />
      <h3 >ENTER EMAIL ID FOR DELETE</h3>
      <b style={{ color: "red" }}>{msg}</b>
      <form onSubmit={handleSubmit}>
        <input type="email" value={pemail}
          onChange={onChangePatientEmail}
          placeholder="EMAIL ID"
          required />
        <br />
        <br />
        <input type="submit" value="DELETE PATIENT" className="btn btn-danger" />
      </form>
    </div>
  )
}


export default Delete
