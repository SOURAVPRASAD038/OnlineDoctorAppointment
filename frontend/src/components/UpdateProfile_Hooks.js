import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavigationBar from './NavigationBar';

function UpdateProfile(props) {
    const [pname, setPatientName] = useState("");
    const [pemail, setPatientEmail] = useState("");
    const [pmobile, setPatientmobile] = useState("");
    const [ppass, setPatientPass] = useState("");
    const [paddress, setPatientAddress] = useState("");
    const [msg, setMessage] = useState("");

    const onChangePatientName = (p) => setPatientName(p.target.value);
    const onChangePatientEmail = (p) => setPatientEmail(p.target.value);
    const onChangePatientMobile = (p) => setPatientmobile(p.target.value);
    const onChangePatientPass = (p) => setPatientPass(p.target.value);
    const onChangePatientAddress = (p) => setPatientAddress(p.target.value);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        console.log(`Form submitted:`);
        console.log(`NAME: ${pname}`);
        console.log(`EMAIL: ${pemail}`);

        const patientinfo = {
            patientname: pname,
            patientemail: pemail,
            patientmobile: pmobile,
            patientpass: ppass,
            patientaddress: paddress
        }

        axios.put('http://localhost:4500/patient/update', patientinfo)
            .then(res => {
                console.log(res.data)
                setMessage('PROFILE UPDATED')
            })
            .catch(err => console.log(err))

        setPatientName('')
        setPatientEmail('')
        setPatientmobile('')
        setPatientPass('')
        setPatientAddress('')

    }

    //Similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        let patientemailid = sessionStorage.getItem('useremail')
        if (patientemailid == null)
            patientemailid = props.email
        axios.get('http://localhost:4500/patient/search/' + patientemailid)
            .then(response => {
                console.log(response.data)
                const { patientname, patientemail, patientmobile, patientpass, patientaddress } = response.data[0]
                setPatientName(patientname)
                setPatientEmail(patientemail)
                setPatientmobile(patientmobile)
                setPatientPass(patientpass)
                setPatientAddress(patientaddress)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <div>
            <NavigationBar />
            <br />
            <h3>PROFILE UPDATE</h3>
            <b style={{ color: "red" }}> {msg}</b>
            <form onSubmit={handleSubmit}>
                <label>NAME: </label> <br />
                <input type="text" value={pname}
                    onChange={onChangePatientName} placeholder="Enter Name"
                    readOnly />
                <br /><br />

                <label>EMAIL: </label> <br />
                <input type="email" value={pemail}
                    onChange={onChangePatientEmail} placeholder="Enter Email"
                    readOnly />
                <br /><br />

                <label>MOBILE: </label> <br />
                <input type="number" value={pmobile}
                    onChange={onChangePatientMobile} placeholder="Enter Mobile No"
                    required />
                <br /><br />

                <label>PASSWORD: </label> <br />
                <input type="password" value={ppass}
                    onChange={onChangePatientPass} placeholder="Enter Password"
                    required />
                <br /><br />

                <label>ADDRESS: </label> <br />
                <textarea value={paddress}
                    onChange={onChangePatientAddress} rows="3" >
                </textarea>
                <br /><br />

                <input type="submit" value="UPDATE PROFILE" className="btn btn-success" />

            </form>
        </div>
    )
}

export default UpdateProfile