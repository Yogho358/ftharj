import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/blogForm'
import Error from './components/Error'
import Notification from './components/notification'
import Togglable from './components/Togglable'

const App = () => {
  const [newTitle,setNewTitle]=useState('')
  const [newAuthor,setNewAuthor]=useState('')
  const [newUrl,setNewUrl]=useState('')
  const [blogs, setBlogs] = useState([])
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [user,setUser]=useState(null)
  const [errorMessage,setErrorMessage]=useState(null)
  const [message,setMessage]=useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => blogs.sort((a,b) => b.likes-a.likes)).then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON=window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON){
      const user=JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleAddTitle=(event) => {
    setNewTitle(event.target.value)
  }

  const handleAddAuthor=(event) => {
    setNewAuthor(event.target.value)
  }

  const handleAddUrl=(event) => {
    setNewUrl(event.target.value)
  }

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

  const refresh=() => {
    blogService.getAll().then(blogs => blogs.sort((a,b) => b.likes-a.likes)).then(blogs =>
      setBlogs( blogs )
    )
  }

  const handleLogout=() => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const addBlog=(event) => {
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
      }).catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        },3000)
      })

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  const blogForm=() => (
    <Togglable buttonLabel='add blog'>
      <BlogForm addBlog={addBlog} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl}
        handleAddTitle={handleAddTitle} handleAddAuthor={handleAddAuthor} handleAddUrl={handleAddUrl}/>
    </Togglable>
  )




  if(user===null){
    return(
      <div>
        <Error message={errorMessage}/>
        <Notification message={message}/>
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

  return (
    <div>
      <Error message={errorMessage}/>
      <Notification message={message}/>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} refresh={refresh} own={user.id===blog.user.id}/>
      )}
    </div>
  )
}

export default App