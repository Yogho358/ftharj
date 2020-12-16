import React from 'react'
import PropTypes from 'prop-types'

const BlogForm=(props) => {
  return(
    <div>
      <form onSubmit={props.addBlog}>
        <div>
            title: <input
            id='title'
            value={props.newTitle}
            onChange={props.handleAddTitle}
          />
            author: <input
            id='author'
            value={props.newAuthor}
            onChange={props.handleAddAuthor}
          />
            url: <input
            id='url'
            value={props.newUrl}
            onChange={props.handleAddUrl}
          />
        </div>
        <div>
          <button id='create' type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes={
  newTitle:PropTypes.string.isRequired
}

export default BlogForm