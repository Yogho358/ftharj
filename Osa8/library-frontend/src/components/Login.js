import {gql,useMutation} from '@apollo/client'
import React,{useEffect, useState} from 'react'

const LOGIN=gql`
    mutation login($username: String!,$password: String!){
        login(username:$username,password:$password){
            value
        }
    }
`

const Login=(props)=>{

    

    

    const [username, setUserName] = useState('')
    const [password,setPassword]=useState('')

    const [login,result]=useMutation(LOGIN)

    useEffect(()=>{
        if(result.data){
            const token=result.data.login.value
            props.setToken(token)
            localStorage.setItem('library-user-token',token)
        }
    },[result.data])  //eslint-disable-line

    if(!props.show){
        return null
    }

    

    const submit=async (event)=>{
        event.preventDefault()

        login({variables:{username,password}})

    }


    return (
        <div>
        <div>Login</div>
        <form onSubmit={submit}>
            <div>
                username <input value={username} onChange={({target})=>setUserName(target.value)}/>                
            </div>
            <div>
                password <input type='password' value={password} onChange={({target})=>setPassword(target.value)}/>
            </div>
            <button type='submit'>login</button>
        </form>
        </div>
    )
}

export default Login