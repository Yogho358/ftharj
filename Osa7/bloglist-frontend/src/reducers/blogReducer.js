import blogService from '../services/blogs'

const blogReducer=(state=[],action)=>{

    switch(action.type){
        case 'INIT_BLOGS':
            return action.data

        case 'ADD':
            return [...state,action.data]

        case 'LIKE':
            return state.map(blog=>
                blog.id!==action.data.id?blog:action.data
                )

        case 'REMOVE':
            return state.filter(blog=>
                blog.id!==action.data)

        default:
            return state
    }
}

export const addBlog=(blogObject)=>{
    return async dispatch=>{
        const newBlog=await blogService.create(blogObject)
        dispatch({
            type:'ADD',
            data:newBlog
        })
    }
}

export const likeBlog=(id,blog)=>{
    return async dispatch=>{
        const likedBlog=await blogService.update(id,blog)
        dispatch({
            type:'LIKE',
            data:likedBlog
        })
    }
}

export const removeBlog=(id)=>{
    return async dispatch=>{
        await blogService.remove(id)
        dispatch({
            type:'REMOVE',
            data:id
        })
    }
}

export const initializeBlogs=()=>{

    return async dispatch=>{
        const blogs=await blogService.getAll()
        dispatch({
            type:'INIT_BLOGS',
            data: blogs
        })
    }
}

export default blogReducer