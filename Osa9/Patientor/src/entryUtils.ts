import {NewHealthCheckEntry,HealthCheckRating,NewHospitalEntry,Discharge, NewOccupationalHealthcareEntry,SickLeave} from './types';

type HealthCheckEntryFields={description:unknown,date:unknown,specialist:unknown,diagnosisCodes:unknown,healthCheckRating:unknown};
type HospitalEntryFields={description:unknown,date:unknown,specialist:unknown,diagnosisCodes:unknown,discharge:unknown};
type OccupationalHealthcareEntryFields={description:unknown,date:unknown,specialist:unknown,diagnosisCodes:unknown,employerName:string,sickLeave:unknown};

export const toNewOccupationalHealthcareEntry=({description,date,specialist,diagnosisCodes,employerName,sickLeave}:OccupationalHealthcareEntryFields):NewOccupationalHealthcareEntry=>{
    const newEntry:NewOccupationalHealthcareEntry={
        type:'OccupationalHealthcare',
        description:parseDescription(description),
        date:parseDate(date),
        specialist:parseSpecialist(specialist),
        diagnosisCodes:parseDiagnosisCodes(diagnosisCodes),
        employerName:parseDescription(employerName),
        sickLeave:parseSickLeave(sickLeave)
    };
    return newEntry;
};

export const toNewHealthCheckEntry=({description,date,specialist,diagnosisCodes,healthCheckRating}:HealthCheckEntryFields):NewHealthCheckEntry=>{
    const newEntry:NewHealthCheckEntry={
        type:'HealthCheck',
        description:parseDescription(description),
        date:parseDate(date),
        specialist:parseSpecialist(specialist),
        diagnosisCodes:parseDiagnosisCodes(diagnosisCodes),
        healthCheckRating:parseHealthCheckRating(healthCheckRating)
    };
    return newEntry;
};

export const toNewHospitalEntry=({description,date,specialist,diagnosisCodes,discharge}:HospitalEntryFields):NewHospitalEntry=>{
    const newEntry:NewHospitalEntry={
        type:'Hospital',
        description:parseDescription(description),
        date:parseDate(date),
        specialist:parseSpecialist(specialist),
        diagnosisCodes:parseDiagnosisCodes(diagnosisCodes),
        discharge:parseDischarge(discharge)
    };
    return newEntry;
};

const isString=(text:unknown):text is string=>{
    return typeof text==='string'||text instanceof String;
};

const isDate=(date:string):boolean=>{
    return Boolean(Date.parse(date));
};


const isRating=(rating:any | undefined):rating is HealthCheckRating=>{
    return Object.values(HealthCheckRating).includes(rating);
};

const parseDescription=(object:unknown):string=>{
    if(!object||!isString(object)){
        throw new Error('Missing or incorrect description: '+object);
    }
    return object;
};

const parseDate=(date:unknown):string=>{
    if(!date||!isString(date)||!isDate(date)){
        throw new Error('Incorrect ot missing date of birth: '+date);
    }
    return date;
};

const parseSpecialist=(object:unknown):string=>{
    if(!object||!isString(object)){
        throw new Error('Missing or incorrect specialist: '+object);
    }
    return object;
};

const parseDiagnosisCodes=(codes:unknown):string[]=>{
    if(!codes){
        return [];
    }
    if(!Array.isArray(codes)){
        throw new Error('diagnosis codes is not array');
    }
    return codes as string[];
};

const parseHealthCheckRating = (
    healthCheckRating: unknown
  ): HealthCheckRating => {
      console.log(healthCheckRating);
    if (!isRating(healthCheckRating)) {
      throw new Error('Incorrect or missing health check rating ');
    }
    return healthCheckRating;
  };

const parseDischarge=(discharge:any|undefined):Discharge=>{
    if (
        
        !isString(discharge.date) ||
        !isDate(discharge.date) ||
        
        !isString(discharge.criteria)
      ) {
        throw new Error('Incorrect or missing discharge: ');
      }
      return discharge as Discharge;
};

const parseSickLeave=(sickLeave:any|undefined):SickLeave=>{
    if(!isString(sickLeave.startDate)||!isDate(sickLeave.startDate)||!isString(sickLeave.endDate||!isDate(sickLeave.endDate))){
        throw new Error('incorrect sick leave dates');
    }
    return sickLeave as SickLeave;
};