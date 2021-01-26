import React from 'react'
//import {useDispatch, useSelector} from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'
import {connect} from 'react-redux'



const AnecdoteList=(props)=>{
    const anecdotes=props.anecdotes.sort((a,b)=>b.votes-a.votes)
    const filter=props.filter
    const filteredAnecdotes=filter===''? anecdotes:anecdotes.filter(a=>a.content.toLowerCase().includes(filter.toLowerCase()))


    const vote = (id) => {
        console.log('vote', id)
        props.voteAnecdote(id)
        //dispatch(voteAnecdote(id))
        const anecdote=anecdotes.find(a=>a.id===id)
        props.setNotification(`You voted for '${anecdote.content}'`,5)
        //dispatch(setNotification(`You voted for '${anecdote.content}'`,5))

      }

    return (
        <div>
        {filteredAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>    
          )}
        </div>
    )
}

const mapStateToProps=(state)=>{
  return {
    anecdotes:state.anecdotes,
    filter:state.filter
  }
}

const mapDispatchToProps={
  voteAnecdote,
  setNotification
}

const connectedAnecdoteList=connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)
export default connectedAnecdoteList