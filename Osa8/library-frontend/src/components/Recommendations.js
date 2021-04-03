import React from 'react'
import {gql, useQuery} from '@apollo/client'

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

const ME=gql`
    query{
        me{
            username
            favoriteGenre
        }
    }
  `

const Recommendations=(props)=>{
    const userResult=useQuery(ME)
    const booksResult=useQuery(ALL_BOOKS)

    if(!props.show){
        return null
    }

    if(userResult.loading || booksResult.loading){
        return <div>loading...</div>
    }

    const books=booksResult.data.allBooks
    const filteredBooks=books.filter(b=>b.genres.includes(userResult.data.me.favoriteGenre))

    return(
        <div>
            <h2>Recommendations</h2>
            <div>books in your favorite genre {userResult.data.me.favoriteGenre}</div>
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
          {filteredBooks.map(a => 
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
            )}
        </tbody>
      </table>
        </div>
    )

}

export default Recommendations