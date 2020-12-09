const mongoose=require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const api=supertest(app)
const Blog=require('../models/blog')
const User = require('../models/user')
const bcrypt=require('bcrypt')
const helper=require('../tests/test_helper')


beforeEach(async ()=>{
    await Blog.deleteMany({})
    
    const blogObjects=helper.initialBlogs
        .map(blog=>new Blog(blog))
    const promiseArray=blogObjects.map(blog=>blog.save())
    await Promise.all(promiseArray)

    User.deleteMany({})
    
})

test('all notes are returned',async()=>{
    const response=await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(helper.initialBlogs.length)
    
})

test('id is defined',async()=>{
    const response=await api.get('/api/blogs')
    
    expect(response.body[0].id).toBeDefined()
})

test('add works',async()=>{

    const testimies={
        username:'testimies',
        name:"Testi Mies",
        password:"pass"
    }

    await api
        .post('/api/users')
        .send(testimies)
        .expect(200)

    const res=await api
                    .post('/api/login')
                    .send({
                        username:"testimies",
                        password:"pass"
                    })
    
    const token=res.body.token
           
    const newBlog={
        title:"test",
        author:"test author",
        url: "testurl",
        likes:5
    }

    await api
        .post('/api/blogs')
        .set('Authorization',`bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd=await helper.blogsInDB()
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length+1)

        const titles=blogsAtEnd.map(blog=>blog.title)
        expect(titles).toContain("test")
})

test('no likes is zero',async()=>{

   

    const res=await api
                    .post('/api/login')
                    .send({
                        username:"testimies",
                        password:"pass"
                    })
    
    const token=res.body.token

    const newBlog={
        title:"like test",
        author:"test author",
        url: "testurl"       
    }

    await api
        .post('/api/blogs')
        .set('Authorization',`bearer ${token}`)
        .send(newBlog)

        const blogsAtEnd=await helper.blogsInDB()
        const blog=blogsAtEnd.find(blog=>blog.title==="like test")
        expect(blog.likes).toBe(0)
})

test('post requires title and url',async()=>{
    const noTitleBlog={
        author:"author of no title",
        url:"notitleurl"
    }

    await api
        .post('/api/blogs')
        .send(noTitleBlog)
        .expect(400)
    
    const noUrlBlog={
        title:"no url",
        author:"no url author"
    }

    await api
        .post('/api/blogs')
        .send(noUrlBlog)
        .expect(400)

    const neitherBlog={
        author:"a"
    }

    await api
        .post('/api/blogs')
        .send(neitherBlog)
        .expect(400)
        
})

test('delete',async()=>{
    const blogsAtStart=await Blog.find({})

    const res=await api
                    .post('/api/login')
                    .send({
                        username:"testimies",
                        password:"pass"
                    })
    
    const token=res.body.token
    const username=res.body.username

    const newBlog={
        title:"test",
        author:"test author",
        url: "testurl",
        likes:5
    }

    await api
        .post('/api/blogs')
        .set('Authorization',`bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtMiddle=await Blog.find({})
      
    const user=await User.findOne({username:username})
    
    const blogToDelete=await Blog.findById(user.blogs[2])
    
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('authorization',`bearer ${token}`)
        .expect(204)
    
    const blogsAtEnd=await Blog.find({})
    expect(blogsAtMiddle.length).toBe(blogsAtStart.length+1)
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
    
})

test('update',async()=>{
    const blogsAtStart=await helper.blogsInDB()
    const blogToUpdate=blogsAtStart[0]
    
    const updated={
        ...blogToUpdate,
        likes:blogToUpdate.likes+1
    }
    
    await api
        .put(`/api/blogs/${updated.id}`)
        .send(updated)
        .expect(200)
})

describe('when there is one user in db',()=>{
    beforeEach(async()=>{
        await User.deleteMany({})

        const passwordHash=await bcrypt.hash('5ala5ana',10)
        const user=new User({
            username:'root',
            passwordHash
        })
        await user.save()
    })

    test('creation succeeds with fresh username',async()=>{
        const usersAtStart=await helper.usersInDb()

        const newUser={
            username:'herto',
            name:'Herto Allas',
            password:'salasana'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type',/application\/json/)

        const usersAtEnd=await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length+1)

        const usernames=usersAtEnd.map(u=>u.username)
        expect(usernames).toContain(newUser.username)
    })

})

describe('no illegal users created',()=>{
    test('no empty usernames',async()=>{
        const newUser={
            username:'',
            name:'Herto Allas',
            password:'salasana'
        }

       const result=await api
            .post('/api/users')
            .send(newUser)
            .expect(500)

        expect(result.body.error).toContain('`username` is required')
    })

    test('no too short usernames',async()=>{
        const newUser={
            username:'h',
            name:'Herto Allas',
            password:'salasana'
        }

        const result=await api
            .post('/api/users')
            .send(newUser)
            .expect(500)

        expect(result.body.error).toContain('`username` (`h`) is shorter')
    })

    test('no same usernames',async()=>{
        const newUser={
            username:'herto',
            name:'Herto Allas',
            password:'salasana'
        }

        const result=await api
            .post('/api/users')
            .send(newUser)
            .expect(500)

        expect(result.body.error).toContain('`username` to be unique')
    })

    test('password exists',async()=>{
        const newUser={
            username:'her',
            name:'Herto Allas',
            password:''
        }

        const result=await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('password required')
    })

    test('password not too short',async()=>{
        const newUser={
            username:'her',
            name:'Herto Allas',
            password:'s'
        }

        const result=await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('password must be at least')
    })
})

afterAll(()=>{
    mongoose.connection.close()
})
