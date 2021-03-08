import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'


describe('Blog',() => {
  let component

  beforeEach(() => {
    const user={
      name:'Testimies'
    }

    const blog={
      title:'Test title',
      author:'Test Author',
      url:'testurli',
      likes:0,
      user:user
    }

    component=render(
      <Blog blog={blog}/>
    )
  })

  test('show only blog and title',() => {

    expect(component.container).toHaveTextContent(
      'Test title'
    )

    const div=component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('show details after click',() => {
    const button=component.getByText('view')
    fireEvent.click(button)

    const div=component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})

