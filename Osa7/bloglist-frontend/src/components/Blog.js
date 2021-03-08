import React, { useState } from 'react'
import blogService from '../services/blogs'
import {likeBlog,removeBlog} from '../reducers/blogReducer'
import {useDispatch} from 'react-redux'


const Blog = ({ blog,own}) => {
  const [visible,setVisible]=useState(false)



  const dispatch=useDispatch()

  const toggleVisibility=() => {
    setVisible(!visible)
  }

  const label=visible?'hide':'view'

  const blogStyle={
    paddingTop:10,
    paddingLeft:2,
    border:'solid',
    borderWidth:1,
    marginBottom:5
  }

  const handleLike=async() => {
    const likedBlog={ ...blog,likes:blog.likes+1,user:blog.user.id }
    dispatch(likeBlog(blog.id,likedBlog))
    //await blogService.update(blog.id,likedBlog)
    
  }

  const remove=async() => {
    if(window.confirm(`Remove blog ${blog.title}?`)){
      //await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
    }
  }



  return(
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{label}</button>
      </div>
      {visible&&(
      <div className="togglableContent">
        
        <div>
        {blog.url}
        </div>
      <div>likes: {blog.likes} <button id='like' onClick={handleLike}>like</button></div>
        <div>
        {blog.user.name}
        </div>
        
        {own&&(<button onClick={remove}>remove</button>)}


      </div>
      )}
    </div>
  )
}

export default Blog
