const blog = require("../models/blog")

const dummy=(blogs)=>{
    return 1
}

const totalLikes=(blogs)=>{
    return blogs.reduce((sum,blog)=>sum+blog.likes,0)
}

const favoriteBlog=(blogs)=>{
    const apu=blogs.map(blog=>blog.likes)
    
    const biggest=Math.max(...apu)
    
    let fBlog={}
    blogs.forEach(blog => {
        if(blog.likes===biggest){
             fBlog={
                title:blog.title,
                author:blog.author,
                url:blog.url,
                likes:blog.likes
            }     
        }        
    })
    return fBlog
}

const mostBlogs=(blogs)=>{

    blogs.sort((a,b)=>a.author.localeCompare(b.author))
    
    let authors=[]
    authors.push({
        author:blogs[0].author,
        blogs:1
    })
    

    for(i=1;i<blogs.length;i++){
        let blog=blogs[i]
        
        let comp=authors[authors.length-1]
        if(blog.author===comp.author){
            comp.blogs=comp.blogs+1
        }else{
            authors.push({
                author:blog.author,
                blogs:1
            })
        }
    }
    authors.sort((a,b)=>b.blogs-a.blogs)

    return authors[0]
}

const mostLikes=(blogs)=>{
    blogs.sort((a,b)=>a.author.localeCompare(b.author))

    let authors=[]
    authors.push({
        author:blogs[0].author,
        likes:blogs[0].likes
    })

    for(i=1;i<blogs.length;i++){
        let blog=blogs[i]
        let comp=authors[authors.length-1]
        if(blog.author===comp.author){
            comp.likes=comp.likes+blog.likes
        }else{
            authors.push({
                author:blog.author,
                likes:blog.likes
            })
        }
    }
    authors.sort((a,b)=>b.likes-a.likes)
    return authors[0]
}

module.exports={
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}