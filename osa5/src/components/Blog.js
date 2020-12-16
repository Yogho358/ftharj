import React, { useState } from 'react'
import blogService from '../services/blogs'



const Blog = ({ blog,refresh,own }) => {
  const [visible,setVisible]=useState(false)

  const hideWhenVisible={ display:visible?'none':'' }
  const showWhenVisible={ display:visible?'':'none' }
  const showRemove={ display:own?'':'none' }

  const toggleVisibility=() => {
    setVisible(!visible)
  }

  const blogStyle={
    paddingTop:10,
    paddingLeft:2,
    border:'solid',
    borderWidth:1,
    marginBottom:5
  }

  const handleLike=async() => {
    const likedBlog={ ...blog,likes:blog.likes+1,user:blog.user.id }

    await blogService.update(blog.id,likedBlog)
    refresh()
  }

  const remove=async() => {
    if(window.confirm(`Remove blog ${blog.name}?`)){
      await blogService.remove(blog.id)
      refresh()
    }
  }



  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='blog'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        <br/>
        {blog.url}
        <br/>
      likes: {blog.likes} <button id='like' onClick={handleLike}>like</button>
        <br/>
        {blog.user.name}
        <br/>
        <button onClick={remove} style={showRemove}>remove</button>


      </div>
    </div>
  )
}

export default Blog
