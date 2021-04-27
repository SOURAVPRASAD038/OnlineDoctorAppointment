// IMPORT EXPRESS SERVER
const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();

//IMPORT EMPLOYEE MODEL AND BIND IT
const PatientModel = require('../models/patient_schema');

// URL :- localhost:4500/patient/register  (USING POSTMAN POST)
/*
{
  "empname": "Chandan",
  "empemail": "chan@gmail.com",
  "empmobile": "9831125144",
  "empdob": "05/09/1984",
  "emppass": "abcd",
  "empgender": "Male",
  "empcountry": "India",
  "empaddress": "Kol",
}
*/
// post is used to INSERT DOCUMENT/RECORD
// CALLBACK using lambda 
router.post('/register', (req, res) => 
                 {
                    
//Create Object of Employee Model Class
// And Receive value from request body and Store value within the Object
                   const patientobj = new PatientModel({
                                 patientname: req.body.patientname,
                                 patientemail: req.body.patientemail,
                                 patientmobile: req.body.patientmobile,
                                 patientdob: req.body.patientdob,
                                 patientpass: req.body.patientpass,
                                 patientgender: req.body.patientgender,
                                //  patientcountry: req.body.empcountry,
                                 patientaddress: req.body.patientaddress,
                                 });//CLOSE EmpModel
     //INSERT/SAVE THE RECORD/DOCUMENT
                   patientobj.save()
                         .then(inserteddocument => {
    res.status(200).send('DOCUMENT INSERTED IN MONGODB DATABASE' +'<br\>'+ inserteddocument);
                               })//CLOSE THEN
                         .catch(err =>{
    res.status(500).send({ message: err.message || 'Error in Patient Save '})
                               });//CLOSE CATCH
                            }//CLOSE CALLBACK FUNCTION BODY Line 27
                            );//CLOSE POST METHOD Line 26

// => localhost:4500/emp/remove/30     (USING POSTMAN DELETE)
//DELETE A DOCUMENT FROM MONGODB USING EMPID
//EmpModel.findOneAndRemove({"empid" : parseInt(req.params.empid)})

// => localhost:4500/emp/remove/abc@gmail.com     (USING POSTMAN DELETE)
//DELETE A DOCUMENT FROM MONGODB USING EMAILID
router.delete('/remove/:emailid', (req, res) =>
            {
  PatientModel.findOneAndRemove({"patientemail" : req.params.emailid})
          .then( deleteddocument => { 
            if(deleteddocument != null)
            {  
  res.status(200).send('DOCUMENT DELETED successfully!' + deleteddocument);
            }  
            else
            {
  res.status(404).send('INVALID PATIENT ID '+ req.params.patientid); 
            }
          }) //CLOSE THEN
          .catch( err => {
 return res.status(500).send({message: "DB Problem..Error in Delete with id " + req.params.patientid });          
          })//CLOSE CATCH
             }//CLOSE CALLBACK FUNCTION BODY Line 60
            ); //CLOSE Delete METHOD Line 59


// localhost:4500/emp/10
//SEARCH EMPLOYEE BY EMPID
// "empid" : parseInt(req.params.empid) Convert empid String to Int
// EmpModel.find({"empid" : parseInt(req.params.empid)})

// localhost:4500/emp/abc@gmail.com
//SEARCH EMPLOYEE BY EMPEMAIL
// CALLBACK function for get method using lambda 
router.get('/search/:emailid', (req, res) => 
            {
      PatientModel.find({"patientemail" : req.params.emailid})
            .then(getsearchdocument => {
              if(getsearchdocument.length >0) 
              {
                res.send(getsearchdocument);
              }
              else
              {
  return res.status(404).send({message: "Note not found with id " + req.params.patientid });
              }
          }) //CLOSE THEN
            .catch( err => {
  return res.status(500).send({message: "DB Problem..Error in Retriving with id " + req.params.patientid });           
            })//CLOSE CATCH
          }//CLOSE CALLBACK FUNCTION BODY Line 88
         );//CLOSE GET METHOD Line 87 

// BROWSER URL :- localhost:4500/emp 
// get IS USED FOR FETCHING DOCUMENTS FROM MONGODB
// CALLBACK using lambda 
router.get('/', (req, res) => 
                {
                PatientModel.find()
                          .then( getalldocumentsfrommongodb => {
    res.status(200).send(getalldocumentsfrommongodb);
                          }) //CLOSE THEN
                          .catch(err =>{
    res.status(500).send({ message: err.message || 'Error in Fetch Patient '})
                          });//CLOSE CATCH
                } //CLOSE CALLBACK FUNCTION BODY Line 110      
          );//CLOSE GET METHOD Line 109  

router.post('/logincheck', (req, res) => 
                 {
                    console.log(req.body.patientemail)
					console.log(req.body.patientpass)
                    PatientModel.find({"patientemail" : req.body.patientemail,"patientpass":req.body.patientpass})
            .then(getsearchdocument => {
              if(getsearchdocument.length >0) 
              {
                res.send(getsearchdocument);
              }
              else
              {
  return res.status(404).send({message: "Note not found with id " + req.params.patientid });
              }
          }) //CLOSE THEN
            .catch( err => {
  return res.status(500).send({message: "DB Problem..Error in Retriving with id " + req.params.patientid });           
            })//CLOSE CATCH
          }//CLOSE CALLBACK FUNCTION BODY
         );//CLOSE GET METHOD  


//UPDATE DOCUMENT IN MONGODB USING EMAILID
router.put('/update', (req, res) => 
            {
    
  PatientModel.findOneAndUpdate({"patientemail" : req.body.patientemail}, 
                              { $set: {"patientmobile":req.body.patientmobile,
							  "patientpass": req.body.patientpass,
							  "patientaddress": req.body.patientaddress
							  } }, { new: true })
          .then(getupdateddocument => {
            if(getupdateddocument != null)
               res.status(200).send('DOCUMENT UPDATED ' + getupdateddocument);  
            else
               res.status(404).send('INVALID EMAILID '+ req.body.patientemail);
          }) // CLOSE THEN
          .catch(err => {
  return res.status(500).send({message: "DB Problem..Error in UPDATE with id " + req.params.patientid });
          }) // CLOSE CATCH
                            } //CLOSE CALLBACK FUNCTION Line No 108
                            ); //CLOSE PUT METHOD Line No 107




//SHOULD BE EXPORTED
module.exports = router;