import React, { useState } from 'react'
import axios from 'axios';
import NavigationBar from './NavigationBar';

function UserLogin(props) {
  const [pemail, setPatientEmail] = useState("");
  const [ppass, setPatientPass] = useState("");;
  const [msg, setMessage] = useState("");;

  const onChangePatientEmail = (p) => setPatientEmail(p.target.value);
  const onChangePatientPass = (p) => setPatientPass(p.target.value);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log(`EMAIL: ${pemail}`);
    console.log(`PASS: ${ppass}`);

    const patientlogininfo = {
      patientemail: pemail,
      patientpass: ppass
    }

    axios.post('http://localhost:4500/patient/logincheck', patientlogininfo)
      .then(res => {
        console.log(res.data)
        sessionStorage.setItem("Key_Veriable", 'USER')
        sessionStorage.setItem("useremail", res.data[0].patientemail)
        sessionStorage.setItem("username", res.data[0].patientname)
        props.history.push('/userafterlogin')
      })
      .catch(err => {
        console.log(err)
        setMessage('INVALID UID OR PASSWORD')
      })

    setPatientEmail('')
    setPatientPass('')
  }

  return (
    <div>
      <NavigationBar />
      <br />
      <h3>USER LOGIN</h3>
      <b style={{ color: "red" }}> {msg} </b>
      <form onSubmit={handleSubmit}>
        <input type="email" value={pemail}
          onChange={onChangePatientEmail}
          placeholder="Enter Email"
          required />
        <br /><br />

        <input type="password" value={ppass}
          placeholder="Enter Password"
          onChange={onChangePatientPass}
          required />
        <br /><br />
        <input type="submit" value="LOGIN" className="btn btn-success" />
      </form>
    </div>
  )
}

export default UserLogin
