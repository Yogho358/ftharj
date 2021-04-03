import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, gql, useSubscription } from '@apollo/client'
import Recommendations from './components/Recommendations'

const BOOK_ADDED=gql`
  subscription{
    bookAdded{
      title
      author{name}
      published
      genres
      id
    }
  }
`

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

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken]=useState(null)
  const client=useApolloClient()

  const logout=()=>{
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const updateCacheWith=(addedBook)=>{
    const includedIn=(set,object)=>
      set.map(p=>p.id).includes(object.id)

    const dataInStore=client.readQuery({query:ALL_BOOKS})
    if(!includedIn(dataInStore.allBooks,addedBook)){
      client.writeQuery({
        query:ALL_BOOKS,
        data:{allBooks:dataInStore.allBooks.concat(addedBook)}
      })
    }
  }

  useSubscription(BOOK_ADDED,{
    onSubscriptionData:({subscriptionData})=>{
      const addedBook=subscriptionData.data.bookAdded
      window.alert(`new book ${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  if(!token){

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={()=> setPage('login')}>login</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <Login
        show={page==='login'} setToken={setToken}
      />

    </div>
  )
  }else{
  return(
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={()=> setPage('recommendations')}>recommendations</button>
        <button onClick={logout}>logout</button>
      </div>
      
      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page==='recommendations'}
        />

    </div>
  )
}
}

export default App