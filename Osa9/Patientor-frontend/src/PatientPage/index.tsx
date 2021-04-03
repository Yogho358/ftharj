/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { useParams } from 'react-router';
import { useStateValue, addPatient } from "../state";
//import {Patient} from '../types';
import axios from 'axios';
import {apiBaseUrl} from '../constants';
import {Entry, Diagnosis, Patient} from '../types';
import EntryDetails from '../components/Entry';
import {setDiagnosisList} from '../state';
import AddHospitalEntryModal from '../AddEntryModal/AddHospitalEntry';
import AddOccupationalEntryModal from '../AddEntryModal/AddOccupationalEntry';
import { Button } from "semantic-ui-react";
import {HospitalEntryFormValues} from '../AddEntryModal/AddHospitalEntryForm';
import {OccupationalEntryFormValues} from '../AddEntryModal/AddOccupationalEntryForm';
import AddHealthCheckEntryModal from '../AddEntryModal/AddHealthCheckEntry';
import {HealthCheckEntryFormValues} from '../AddEntryModal/AddHealthCheckEntryForm';

const PatientPage=()=>{
    const {id}=useParams<{id:string}>();
    const [{patients,diagnoses},dispatch]=useStateValue();


    React.useEffect(() => {
        
        const fetchDiagnosisList=async()=>{
          try{
            const {data:diagonsisListFromApi}=await axios.get<Diagnosis[]>(
              `${apiBaseUrl}/diagnoses`
            );
            dispatch(setDiagnosisList(diagonsisListFromApi));
          }catch(e){
            console.error(e);
          }
        };
        
        void fetchDiagnosisList();
      }, [dispatch]);

      const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
      const [occupationalModalOpen,setOccupationalModalOpen]=React.useState<boolean>(false);
      const [healthCheckModalOpen,setHealthCheckModalOpen]=React.useState<boolean>(false);
      const openHospitalModal = (): void => setHospitalModalOpen(true);
      const openOccupationalModal=():void=>setOccupationalModalOpen(true);
      const openHealthCheckModal=():void=>setHealthCheckModalOpen(true);
      const [error, setError] = React.useState<string | undefined>();
      const closeHospitalModal = (): void => {
        setHospitalModalOpen(false);
        setError(undefined);
      };
      const closeOccupationalModal=():void=>{
          setOccupationalModalOpen(false);
          setError(undefined);
      };
      const closeHealthCheckModal=():void=>{
          setHealthCheckModalOpen(false);
          setError(undefined);
      };

      const submitNewEntry = async (values: HospitalEntryFormValues|OccupationalEntryFormValues|HealthCheckEntryFormValues) => {

        try {
          const { data: modifiedPatient } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          dispatch({ type: "ADD_PATIENT", payload: modifiedPatient });
          closeHospitalModal();
          closeOccupationalModal();
          closeHealthCheckModal();
        } catch (e) {
          console.error(e.response?.data || 'Unknown Error');
          setError(e.response?.data?.error || 'Unknown error');
        }
      };

    const getPatient=async()=>{
        try{
            
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const {data:fetchedPatient}=await axios.get(
                `${apiBaseUrl}/patients/${id}`
            );
            dispatch(addPatient(fetchedPatient));
            
        }catch(e){
            console.log(e.message);
        }
    };
    
   
    

    const patient=patients[id];
    if(patient){
    if(!patient.ssn){
        void getPatient();
    }
    }

    if(diagnoses==={}){
        return (<div>loading</div>);
    }

    const finalPatient=patients[id];
    if(finalPatient){
        const entries:Entry[]=finalPatient.entries;
    return (
        <div>
            <h2>{finalPatient.name}</h2>
            <div>gender: {finalPatient.gender}</div>
            <div>ssn: {finalPatient.ssn}</div>
            <div>occupation: {finalPatient.occupation}</div>
            <h3>entries</h3>
            <ul>
                {entries.map(entry=>
                    <li key={entry.id}>
                        <EntryDetails entry={entry}/>
                    </li>)}
            </ul>
            <AddHospitalEntryModal
                modalOpen={hospitalModalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeHospitalModal}
            />
            <AddOccupationalEntryModal
                modalOpen={occupationalModalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeOccupationalModal}
            />
            <AddHealthCheckEntryModal
                modalOpen={healthCheckModalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeHealthCheckModal}
            />
            <Button onClick={() => openHospitalModal()}>Add New Hospital Entry</Button>
            <Button onClick={()=> openOccupationalModal()}>Add New Occupational Healthcare Entry</Button>
            <Button onClick={()=> openHealthCheckModal()}>Add New Health Check Entry</Button>
        </div>
    );
    }
    return(<div>loading</div>);
    
};

export default PatientPage;