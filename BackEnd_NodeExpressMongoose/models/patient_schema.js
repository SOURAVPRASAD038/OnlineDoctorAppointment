const schema_mongoose = require('mongoose');

const PatientSchema = schema_mongoose.Schema(
    {
    patientname: { type: String },
    patientemail: { type: String },
    patientmobile: { type: String },
    patientdob: { type: String },
    patientpass: { type: String },
    patientgender: { type: String },
    // patientcountry: { type: String },
    patientaddress: { type: String },
	regdatetime: { type: Date, default: Date.now }
    }, 
    {
       timestamps: true
    }
    );

module.exports = schema_mongoose.model('patient_schema_collection', PatientSchema);