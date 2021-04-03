import React from 'react';
import {Entry,OccupationalHealthcareEntry,HospitalEntry as HospitalEntryType,HealthCheckEntry as HealthCheckEntryType} from '../types';
import {Icon} from 'semantic-ui-react';
import { useStateValue } from '../state';




const EntryDetails:React.FC<{entry:Entry}>=({entry,})=>{

    

    const assertNever=(value:never):never=>{
        throw new Error(
            `wrong value: ${JSON.stringify(value)}`
        );
    };

    switch(entry.type){
        case 'Hospital':
            return <HospitalEntry entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalEntry entry={entry} />;
        case 'HealthCheck':
            return <HealthCheckEntry entry={entry} />;

        default: return assertNever(entry);
    }
    
};

const HospitalEntry:React.FC<{entry:HospitalEntryType}>=({entry})=>{
    const [{diagnoses}]=useStateValue();
    return(
        <div>
            <h3>{entry.date} <Icon name='hospital'/></h3>
            <div>{entry.specialist}</div>
            <div>{entry.description}</div>
            {entry.diagnosisCodes ? 
            <ul>
                {entry.diagnosisCodes.map(code=>
                    <li key={code}>
                        {diagnoses[code].name}
                    </li>)}
            </ul>:null}
            <div>Discharged on {entry.discharge.date} due to {entry.discharge.criteria}</div>
        </div>
    );
};

const OccupationalEntry:React.FC<{entry:OccupationalHealthcareEntry,}>=({entry})=>{
    
    
    const [{diagnoses}]=useStateValue();
    
    return(
        <div>
            <h3>{entry.date} <Icon name='pills'/> {entry.employerName}</h3> 
            <div>{entry.specialist}</div>
            <div>{entry.description}</div>
            {entry.diagnosisCodes ? 
            <ul>
                {entry.diagnosisCodes.map(code=>
                    <li key={code}>
                        {diagnoses[code].name}
                    </li>)}
            </ul>:null}
            {entry.sickLeave ? <div>sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</div>:null}
        </div>
    ); 
};

const HealthCheckEntry:React.FC<{entry:HealthCheckEntryType}>=({entry})=>{
    const [{diagnoses}]=useStateValue();
    return(
        <div>
            <h3>{entry.date} <Icon name='user md'/></h3>
            <div>{entry.specialist}</div>
            <div>{entry.description}</div>
            {entry.diagnosisCodes ? 
            <ul>
                {entry.diagnosisCodes.map(code=>
                    <li key={code}>
                        {diagnoses[code].name}
                    </li>)}
            </ul>:null}
            <div>Health rating: {entry.healthCheckRating}</div>
        </div>
    );
};

export default EntryDetails;