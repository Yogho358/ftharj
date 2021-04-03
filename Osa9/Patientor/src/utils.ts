import {NewPatient, Gender} from './types';

type Fields={name:unknown,dateOfBirth:unknown,ssn:unknown,gender:unknown,occupation:unknown};

const toNewPatient=({name,dateOfBirth,ssn,gender,occupation}:Fields):NewPatient=>{
    const newPatient:NewPatient={
        name:parseName(name),
        dateOfBirth:parseDOB(dateOfBirth),
        ssn:parseSsn(ssn),
        gender:parseGender(gender),
        occupation:parseOccupation(occupation),
        entries:[]
    };
    return newPatient;
};

const isString=(text:unknown):text is string=>{
    return typeof text==='string'||text instanceof String;
};

const isDate=(date:string):boolean=>{
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender=(param:any):param is Gender=>{
    return Object.values(Gender).includes(param);
};

const parseName=(name:unknown):string=>{
    if(!name||!isString(name)){
        throw new Error('Incorrect or missing name: '+name);
    }
    return name;
};

const parseDOB=(DOB:unknown):string=>{
    if(!DOB||!isString(DOB)||!isDate(DOB)){
        throw new Error('Incorrect ot missing date of birth: '+DOB);
    }
    return DOB;
};

const parseSsn=(ssn:unknown):string=>{
    if(!ssn||!isString(ssn)){
        throw new Error('Incorrect or missing ssn: '+ssn);
    }
    return ssn;
};

const parseGender=(gender:unknown):Gender=>{
    if(!gender||!isGender(gender)){
        throw new Error('Incorrect or missing gender: '+gender);
    }
    return gender;
};

const parseOccupation=(occupation:unknown):string=>{
    if(!occupation||!isString(occupation)){
        throw new Error('Incorrect or missing occupation: '+occupation);
    }
    return occupation;
};

export default toNewPatient;


