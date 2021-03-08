import React from 'react'

const User=({user})=>{
console.log(user)
   if(!user){
        return null
    }
    return(
        <div>
            <h2>{user.name}</h2>
            <h4>Added blogs</h4>
            <div>
                {user.blogs.map(blog=>
                    <li key={blog.id}>
                        {blog.title}
                    </li>)}
            </div>
        </div>
    )
}

export default User