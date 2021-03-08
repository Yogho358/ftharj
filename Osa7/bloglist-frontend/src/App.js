import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/blogForm'
import Error from './components/Error'
import Notification from './components/notification'
import Togglable from './components/Togglable'
import {setNotification} from './reducers/notificationReducer'
import {useDispatch,useSelector} from 'react-redux'
import {initializeBlogs, addBlog} from './reducers/blogReducer'
import {getAll} from './reducers/userReducer'
import Users from './components/Users'
import {BrowserRouter as Router, Switch, Link,Redirect, Route,useRouteMatch} from 'react-router-dom'
import User from './components/User'
import {Table} from 'react-bootstrap'


const App = () => {
  //const [newTitle,setNewTitle]=useState('')
  //const [newAuthor,setNewAuthor]=useState('')
  //const [newUrl,setNewUrl]=useState('')
  //const [blogs, setBlogs] = useState([])
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [user,setUser]=useState(null)
  const [errorMessage,setErrorMessage]=useState(null)
  const [message,setMessage]=useState(null)

  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(initializeBlogs())
  },[dispatch])

  useEffect(()=>{
    dispatch(getAll())
  },[dispatch])

  useEffect(() => {
    const loggedUserJSON=window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON){
      const user=JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const blogs=useSelector(state=>state.blogs)
  blogs.sort((a,b)=>b.likes-a.likes)

  const allUsers=useSelector(state=>state.users)
  console.log(allUsers)

  



  /*const handleAddTitle=(event) => {
    setNewTitle(event.target.value)
  }

  const handleAddAuthor=(event) => {
    setNewAuthor(event.target.value)
  }

  const handleAddUrl=(event) => {
    setNewUrl(event.target.value)
  }*/

  const handleLogin=async (event) => {
    event.preventDefault()
    try{
      const user=await loginService.login({
        username,password
      })

      window.localStorage.setItem(
        'loggedBloglistUser',JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch (exception){
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      },3000)
    }
  }

  /*const refresh=() => {
    blogService.getAll().then(blogs => blogs.sort((a,b) => b.likes-a.likes)).then(blogs =>
      setBlogs( blogs )
    )
  }*/

  const handleLogout=() => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  /*const addBlog=(event) => {
    event.preventDefault()
    const blogObject={
      title:newTitle,
      author:newAuthor,
      url:newUrl
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`Added ${newTitle}`)
        setTimeout(() => {
          setMessage(null)
        },3000)
        refresh()
        dispatch(addBlog(blogObject))
        dispatch(setNotification(`Added ${newTitle}`,3))
      }).catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        },3000)
      })

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }*/

  const blogForm=() => (
    <Togglable buttonLabel='add blog'>
      <BlogForm /*addBlog={addBlog} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl}
        handleAddTitle={handleAddTitle} handleAddAuthor={handleAddAuthor} handleAddUrl={handleAddUrl}*//>
    </Togglable>
  )

  const match=useRouteMatch('/users/:id')
  
  const singleUser=match?allUsers.find(user=>user.id===match.params.id):null
 

  if(user===null){
    return(
      <div>
        <Error message={errorMessage}/>
        <Notification />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='loginButton' type="submit">login</button>

        </form>
      </div>
    )
  }

  const Blogs=({user,blogs})=>{
    return(
    <div>
      
      {blogForm()}
      <Table striped>
        <tbody>
      {blogs.map(blog =>
        <tr key={blog.id}>
          <td>
        <Blog key={blog.id} blog={blog} /*refresh={refresh}*/user={user.username} own={user.username===blog.user.username}/>
        </td>
        </tr>
      )}
        </tbody>
      </Table>
    </div>
    )}

  const padding={
    padding:5
  }

  return (
    
    <div class="container">
      <Error message={errorMessage}/>
      <Notification/>
      <div>
      <h2>Blogs</h2>
      <div>
        <Link style={padding} to='/blogs'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      </div>
      <Switch>
        <Route path='/blogs'>
          <Blogs user={user} blogs={blogs}/>
        </Route>
        <Route path='/users/:id'>
          <User user={singleUser}/>
        </Route>
        <Route path='/users'>
          <Users users={allUsers}/>
        </Route>
        <Route path='/'>
          <Redirect to='/blogs'/>
        </Route>
      </Switch>
    </div>
    
  )
}

export default App