import {gql, useQuery} from '@apollo/client'
import React,{useEffect, useState} from 'react'


const ALL_BOOKS=gql`
  query{
    allBooks{
      title
      author{name}
      published
      genres
      id
    }
  }`


const Books = (props) => {
  const result=useQuery(ALL_BOOKS,{
    pollInterval:2000
  })
  
  const [booksToDisplay,setBooksToDisplay]=useState([])
  const [genre,setGenre]=useState('')

  useEffect(()=>{
    if(result.data){
      if(genre===''){
        setBooksToDisplay(result.data.allBooks)
      }else{
        const books=result.data.allBooks
        const filteredBooks=books.filter(b=>b.genres.includes(genre))
        setBooksToDisplay(filteredBooks)
        
      }
    }else{
      setBooksToDisplay([])
    }
  },[result,genre])
  
  if (!props.show) {
    return null
  }
  if(result.loading){
    return <div>loading...</div>
  }

 
  const books=result.data.allBooks
 
  const genres=books.map(b=>b.genres)
  let g=[]
  genres.forEach(element => {element.forEach(e=>{
    if(!g.includes(e)){
    g.push(e)
      }
    })
  })

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToDisplay.map(a => 
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
            )}
        </tbody>
      </table>
      <div>
        {g.map(g=>
          <button key={g} onClick={()=>setGenre(g)}>{g}</button>        
          )}
          <button onClick={()=>setGenre('')}>all</button>
      </div>
    </div>
  )
}

export default Books