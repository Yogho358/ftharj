import patients from '../../data/patients';
import {NossnPatient,NewPatient,Patient,NewHealthCheckEntry, NewHospitalEntry,NewOccupationalHealthcareEntry} from '../types';
import {v4 as uuid} from 'uuid';


const newId:string=uuid();

const getPatientsNossn=():NossnPatient[]=>{
    return patients.map(({id,name,dateOfBirth,gender,occupation,entries})=>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};

const getPatients=():Patient[]=>{
    return patients;
};

const findById=(id:string):NossnPatient|undefined=>{
    const patient=patients.find(p=>p.id===id);
    if(patient){
        const patientToReturn={
            id:patient.id,
            name:patient.name,
            dateOfBirth:patient.dateOfBirth,
            gender:patient.gender,
            occupation:patient.occupation,
            entries:patient.entries,
            ssn:patient.ssn
        };
        return patientToReturn;
    }
    return patient;
};

const addPatient=(entry:NewPatient):Patient=>{
    const newPatient={
        id:newId,
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry=(patientId:string,entry:NewHealthCheckEntry|NewHospitalEntry|NewOccupationalHealthcareEntry):Patient|undefined=>{
    const index=patients.findIndex(p=>p.id===patientId);
    const patient=patients[index];
    const newEntry={
        id:uuid(),
        ...entry,
    };
    patient.entries.push(newEntry);
    return patient;
};

export default {
    getPatientsNossn,
    addPatient,
    getPatients,
    findById,
    addEntry,
};