import React, { useState, useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getAll} from '../reducers/userReducer'
import {Link} from 'react-router-dom'


const Users=({users})=>{

    /*const dispatch=useDispatch()
    const users=useSelector(state=>state.users)

    useEffect(()=>{
        dispatch(getAll())
      },[dispatch])*/



    return(
        <div>
            <div>
                <h2>Users</h2>
            </div>
        
        <div>
        {users.map(user=>
            <div key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}, {user.blogs.length} blogs</Link>
            </div>)}
        </div>
        </div>
    )
}

export default Users



