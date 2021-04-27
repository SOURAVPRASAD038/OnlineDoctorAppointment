import React, { useState } from 'react'
import axios from 'axios';
import NavigationBar from './NavigationBar';

function Registration() {

    const [pname, setPatientName] = useState("");
    const [pemail, setPatientEmail] = useState("");
    const [pmobile, setPatientmobile] = useState("");
    const [pdob, setPatientDOB] = useState("");
    const [ppass, setPatientPass] = useState("");
    const [pgender, setPatientGender] = useState("");
    // const [ecountry, setEmpCountry] = useState("");
    const [paddress, setPatientAddress] = useState("");
    const [msg, setMessage] = useState("");

    const onChangePatientName = (e) => setPatientName(e.target.value);
    const onChangePatientEmail = (e) => setPatientEmail(e.target.value);
    const onChangePatientMobile = (e) => setPatientmobile(e.target.value);
    const onChangePatientDOB = (e) => setPatientDOB(e.target.value);
    const onChangePatientPass = (e) => setPatientPass(e.target.value);
    const onChangePatientGender = (e) => setPatientGender(e.target.value);
    // const onChangeEmpCountry = (e) => setEmpCountry(e.target.value);
    const onChangePatientAddress = (e) => setPatientAddress(e.target.value);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(`Form submitted:`);
        console.log(`NAME: ${pname}`);
        console.log(`EMAIL: ${pemail}`);

        const patientinfo = {
            patientname: pname,
            patientemail: pemail,
            patientmobile: pmobile,
            patientdob: pdob,
            patientpass: ppass,
            patientgender: pgender,
            // patientcountry: ecountry,
            patientaddress: paddress
        }

        axios.post('http://localhost:4500/patient/register', patientinfo)
            .then(res => {
                console.log(res.data)
                setMessage('REGISTRATION SUCCESSFUL')
            });

        setPatientName('')
        setPatientEmail('')
        setPatientmobile('')
        setPatientDOB('')
        setPatientPass('')
        setPatientGender('')
        // setPatientCountry('')
        setPatientAddress('')

    }

    return (
        <div>
            <NavigationBar />
            <br />
            <h3>REGISTRATION FORM</h3>
            <h4 style={{ color: "brown" }}> {msg}</h4>
            <form onSubmit={handleSubmit}>
                <input type="text" value={pname}
                    onChange={onChangePatientName} placeholder="Enter Name"
                    required />
                <br /><br />

                <input type="email" value={pemail}
                    onChange={onChangePatientEmail} placeholder="Enter Email"
                    required />
                <br /><br />

                <input type="number" value={pmobile}
                    onChange={onChangePatientMobile} placeholder="Enter Mobile No"
                    required />
                <br /><br />

                <input type="date" value={pdob}
                    onChange={onChangePatientDOB} />
                <br /><br />

                <input type="password" value={ppass}
                    onChange={onChangePatientPass} placeholder="Enter Password"
                    required />
                <br /><br />

                <input type="radio" name="gender" value="MALE"
                    checked={pgender === 'MALE'}
                    onChange={onChangePatientGender} />
                <label>Male</label>

                <input type="radio" name="gender" value="FEMALE"
                    checked={pgender === 'FEMALE'}
                    onChange={onChangePatientGender} />
                <label>Female</label>
                <br /><br />

                {/* { <select value={pcountry} onChange={onChangePatientCountry}>  */}
                    {/* <option value="AF">Afghanistan</option> */}
                    {/* <option value="India">India</option> */}
                    {/* <option value="UK">UK</option> */}
                    {/* <option value="USA">USA</option> */}
                {/* </select> */}
                {/* <br /><br /> } */}

                <label>ADDRESS: </label> <br />
                <textarea value={paddress}
                    onChange={onChangePatientAddress} rows="3" >
                </textarea>
                <br /><br />

                <input type="submit" value="REGISTER" className="btn btn-primary" />

            </form>
        </div>
    )
}


export default Registration
