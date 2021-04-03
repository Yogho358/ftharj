import React,{useState} from 'react'
import {gql, useQuery, useMutation} from '@apollo/client'
import Select from 'react-select'

const ALL_AUTHORS=gql`
  query{
    allAuthors{
      name
      born
      bookCount
      id
    }
  }
`
const EDIT_AUTHOR=gql`
  mutation editAuthor($name: String!,$setBornTo: Int!){
    editAuthor(
      name:$name,
      setBornTo:$setBornTo
    ){
      name
    }
  }
`


const Authors = (props) => {
  const [author,setAuthor]=useState(null)
  const [year,setYear]=useState(0)

  const result=useQuery(ALL_AUTHORS,{
    pollInterval:2000
  })
  const [editAuthor]=useMutation(EDIT_AUTHOR)


  if (!props.show) {
    return null
  }
  
  if(result.loading){
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  const options=authors.map(a=>{
    return {value:a.name,label:a.name}
  })

  

  const update=async event=>{
    event.preventDefault()
    const name=author.value
    const setBornTo=year

    editAuthor({variables:{name,setBornTo}})    
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={update}>
            <Select
              defaultValue={author}
              onChange={setAuthor}
              options={options}
            />
            <input value={year} onChange={({target})=>setYear(Number(target.value))}/>
            <button type='submit'>update author</button>

        </form>
      </div>

    </div>
  )
}

export default Authors