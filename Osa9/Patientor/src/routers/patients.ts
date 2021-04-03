
import express from 'express';
import patientService from '../services/patientService';
import {NewPatient,} from '../types';
import toNewPatient from '../utils';
import {toNewHealthCheckEntry,toNewHospitalEntry,toNewOccupationalHealthcareEntry} from './../entryUtils';



const router=express.Router();

router.get('/:id',(req,res)=>{
    const patient=patientService.findById(req.params.id);

    if(patient){
        res.send(patient);
    }else{
        res.sendStatus(400);
    }
});

router.get('/',(_req,res)=>{
    res.send(patientService.getPatientsNossn());
});

router.post('/:id/entries',(req,res)=>{

    try{
        console.log(req.body.type);
        if(req.body.type==='HealthCheck'){
            const newEntry=toNewHealthCheckEntry(req.body);
            const modifiedPatient=patientService.addEntry(req.params.id,newEntry);
            res.json(modifiedPatient);
        }
        if(req.body.type==='Hospital'){
            const newEntry=toNewHospitalEntry(req.body);
            const modifiedPatient=patientService.addEntry(req.params.id,newEntry);
            res.json(modifiedPatient);
        }
        if(req.body.type==='OccupationalHealthcare'){
            const newEntry=toNewOccupationalHealthcareEntry(req.body);
            const modifiedPatient=patientService.addEntry(req.params.id,newEntry);
            res.json(modifiedPatient);
        }
        }catch(e){
            res.status(400).send(e.message);
        }
    }
);

router.post('/',(req,res)=>{
    try{
        const newPatient:NewPatient=toNewPatient(req.body);
        const addedPatient=patientService.addPatient(newPatient);
        res.json(addedPatient);
    }catch(e){
        res.status(400).send(e.message);
    }
});

export default router;