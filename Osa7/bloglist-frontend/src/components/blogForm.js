import React from 'react'
import PropTypes from 'prop-types'
import {addBlog} from '../reducers/blogReducer'
import {useDispatch} from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'


const BlogForm=() => {

  const dispatch=useDispatch()

  const add=async(event)=>{
    event.preventDefault()
    const newTitle=event.target.title.value
    const newAuthor=event.target.author.value
    const newUrl=event.target.url.value
    const blogObject={
      title:newTitle,
      author:newAuthor,
      url:newUrl
    }
    event.target.title.value=''
    event.target.author.value=''
    event.target.url.value=''
    dispatch(addBlog(blogObject))
    dispatch(setNotification(`added blog ${newTitle}`,3))
  }

  return(
    <div>
      <form onSubmit={add}>
        <div>
            title: <input
            id='title'
            name='title'
          />
            author: <input
            id='author'
            name='author'
          />
            url: <input
            id='url'
            name='url'
          />
        </div>
        <div>
          <button id='create' type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}



export default BlogForm