import React,{useEffect, useState} from 'react'
import axios from 'axios'


const Maat=({maat,setFilter})=>{
  
  


  if(maat.length===0){
    return(
      <div>
        search for countries
      </div>
    )
  }
  
  if(maat.length>10){
    return(
      <div>
        Too many matches
      </div>
    )
  }
  if(maat.length>1){
    return(
      <div>
         <ul>
          {maat.map(maa=><li key={maa.name}>{maa.name} <button onClick={()=>setFilter(maa.name)}>show</button></li>)}
        </ul>
      </div>
    )
  }
  else return(
    <Maa maa={maat[0]}/>
  )
  
}

const Maa=(props)=>{

  const api=process.env.REACT_APP_API_KEY
  console.log(api)
  const[lampotila,setLampotila]=useState('')
  const[tuulennopeus,setTuulenNopeus]=useState('')
  const[tuulensuunta,setTuulensuunta]=useState('')
  const[ikoni,setIkoni]=useState('')
  
  useEffect(()=>{
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api}&query=${props.maa.capital}`)
      .then(response=>{
        console.log(response)
        console.log(response.data.current.temperature)
        setLampotila(response.data.current.temperature)
        console.log('lampotila',lampotila)
        setTuulenNopeus(response.data.current.wind_speed)
        setTuulensuunta(response.data.current.wind_dir)
        setIkoni(response.data.current.weather_icons[0])
      })
  })
  console.log('lampotila2',lampotila)

  return(
  <div>
    <h2>{props.maa.name}</h2>
    <div>{props.maa.capital}</div>
    <div>population {props.maa.population}</div>
    <h4>languages</h4>
    <ul>
      {props.maa.languages.map(language=>
        <li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={props.maa.flag} alt='lippu' width='300' height='200'></img>

    <h4>Weather in {props.maa.capital}</h4>
    <div>temperature: {lampotila}</div>
    <img src={ikoni} alt='saa'></img>
    <div>wind: {tuulennopeus} direction {tuulensuunta}</div>

  </div>
  )
}

const App=()=>{
  const [filter,setFilter]=useState('')
  const[maat,setMaat]=useState([])

  useEffect(()=>{
    
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response=>{
        setMaat(response.data)
        console.log(response.data)
      })
  },[])

  

    const handleFilter=(event)=>{
      setFilter(event.target.value)
    }

    

    const naytettavatMaat=maat.filter(maa=>maa.name.toLowerCase().includes(filter.toLowerCase()))


    return(
      <div>
        find countries <input value={filter} onChange={handleFilter}/>
        <Maat maat={naytettavatMaat} setFilter={setFilter}/>
      </div>
    )

}

export default App