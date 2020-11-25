import React from 'react'

const Header=(props)=>{
    return(
      <div>
        <h1>{props.course.name}</h1>
      </div>
    )  
  }
  
  const Content=(props)=>{
    
    return(
    <>
      {props.parts.map(part=>
        <Part key={part.id} part={part}/>
        )}
      
    </>
    )
  }
  
  const Total=(props)=>{
    const tehtavat=props.parts.map(part=>part.exercises)
    return(
      <>
      
      {tehtavat.reduce((a,b)=>a+b,0)}
      </>
    )
  }
  
  const Part=(props)=>{
    
    return(
      
      <>
      
      <p>{props.part.name} {props.part.exercises}</p>
      </>
    )
  }
  
  
  const Course=(props)=>{
    return(
      <div>
      <Header course={props.course}/>
      <Content parts={props.course.parts}/>
      Total of <Total parts={props.course.parts}/> exercises
      </div>
    )
  }

  export default Course