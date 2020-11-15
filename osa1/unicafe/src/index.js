import React,{useState} from 'react';
import ReactDOM from 'react-dom';

const Button=({handleClick,text})=>{
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}



const App=()=>{
  const[good,setGood]=useState(0)
  const [neutral,setNeutral]=useState(0)
  const[bad,setBad]=useState(0)
  const[all,setAll]=useState(0)
  const[sum,setSum]=useState(0)

  const handleGoodClick=()=>{
    setGood(good+1)
    setAll(all+1)
    setSum(sum+1)
  }
  const handleNeutralClick=()=>{
    setNeutral(neutral+1)
    setAll(all+1)
  }
  const handleBadClick=()=>{
    setBad(bad+1)
    setAll(all+1)
    setSum(sum-1)
  }

  return(
    <div>
      <h3>give feedback</h3>

      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick}text='bad'/>

      <Statistics good={good} neutral={neutral} bad={bad} all={all} sum={sum}/>

      

    </div>
  )
}

const Statistics=(props)=>{

  if(props.all===0){
    return(
      <div>
      <h3>No feedback given</h3>
      </div>
    )
  }
  return(
  <div>
  <h3>Statistics</h3>

    <table>
      <tbody>
  <StatisticsLine teksti='good' arvo={props.good}/>
  <StatisticsLine teksti='neutral' arvo={props.neutral}/>
  <StatisticsLine teksti='bad' arvo={props.bad}/>
  <StatisticsLine teksti='all' arvo={props.all}/>
  <StatisticsLine teksti='average' arvo={props.sum/props.all}/>
  <StatisticsLine teksti='positive' arvo={props.good/props.all*100} loppu=' %'/>
      </tbody>
    </table>
  </div>
  )
}

const StatisticsLine=(props)=>{
  return(
    
      
        <tr>
      <td>{props.teksti}</td><td>{props.arvo} {props.loppu}</td>
      </tr>
      
    
  )
}

ReactDOM.render(<App/>,document.getElementById('root'))