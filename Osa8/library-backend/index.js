const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const {v1:uuid}=require('uuid')
const mongoose=require('mongoose')
const Book=require('./models/book')
const Author=require('./models/author')
const User=require('./models/user')
const jwt=require('jsonwebtoken')
const {PubSub}=require('apollo-server')
const pubsub=new PubSub()

const JWT_SECRET='SECRET_NEEDED'

const MONGODB_URI='mongodb+srv://fullstack:fsss@cluster0.b9oab.mongodb.net/library?retryWrites=true'

console.log('connectong to',MONGODB_URI)

mongoose.connect(MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true})
  .then(()=>{
    console.log('connected to MongDB')
  })
  .catch((error)=>{
console.log('error connecting to MongoDB:',error.message)})

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`

    type Book {
        title: String!
        author: Author!
        published: Int!
        genres:[String!]!
        id: ID!
    }

    type Author {
        name:String!
        born:Int
        bookCount:Int
        id:ID!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author:String,genre:String):[Book!]!
        allAuthors:[Author!]!
        me:User
    }

    type Mutation {
        createUser(
          username:String!
          favoriteGenre:String!
        ):User

        login(
          username:String!
          password:String!
        ):Token

        addBook(
            title:String!
            author:String!
            published: Int
            genres:[String]
        ):Book
        
        editAuthor(
            name:String!
            setBornTo:Int!
        ):Author
    }

    type User{
      username:String!
      favoriteGenre:String
      id:ID!
    }

    type Token{
      value: String!
    }

    type Subscription{
      bookAdded:Book!
    }
`

const resolvers = {

  Subscription:{
    bookAdded:{
      subscribe:()=>pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },

  Mutation:{

    createUser:(root,args)=>{
      const user=new User({username:args.username,favoriteGenre:args.favoriteGenre})

      return user.save().catch(error=>{throw new UserInputError(error.message,{invalidArgs:args})})
    },

    login:async(root,args)=>{
      const user=await User.findOne({username:args.username})

      if(!user||args.password!=='secret'){
        throw new UserInputError("wrong credentials")
      }
      const userForToken={
        username:user.username,
        id:user._id
      }
      return {value:jwt.sign(userForToken,JWT_SECRET)}
    },

    addBook: async (root,args,{currentUser})=>{

      if(!currentUser){
        throw new AuthenticationError("not authenticated")
      }
      
      let author=await Author.findOne({name:args.author})
      if(author===null){
        author=new Author({name:args.author})
        try{
        await author.save()
        }catch(error){
          throw new UserInputError(error.message,{invalidArgs:args})
        }
      }
      const book= new Book({...args,author:author})  
      try{ 
     await book.save()
      }catch(error){
        throw new UserInputError(erro.message,{invalidArgs:args})
      }

      pubsub.publish('BOOK_ADDED',{bookAdded:book})

      return book

        /*const book={...args,id:uuid()}
        books=books.concat(book)
        const author=authors.find(a=>a.name===book.author)
        if(author===undefined){
            const newAuthor={
                name:book.author,
                id:uuid()
            }

            authors=authors.concat(newAuthor)

        }
        return book*/
    },

    editAuthor:async (root,args,{currentUser})=>{

      if(!currentUser){
        throw new AuthenticationError("not authenticated")
      }

      const updatedAuthor={name:args.name,born:args.setBornTo}
      return Author.findOneAndUpdate({name:args.name},updatedAuthor,{new:true})
        
        /*const author=authors.find(a=>a.name===args.name)
        if(!author){
            return null
        }

        const updatedAuthor={...author,born:args.setBornTo}
        authors=authors.map(a=>a.name===args.name?updatedAuthor:a)
        return updatedAuthor*/
    }
    
  },
  Query: {
      me:(root,args,context)=>{
        return context.currentUser
      },

      bookCount:()=>Book.collection.countDocuments(),
      authorCount:()=>Author.collection.countDocuments(),
      allBooks:(root,args)=>{
        
        booksToReturn=Book.find({}).populate('author')

       
          if(args.author!==undefined){
              booksToReturn=booksToReturn.filter(b=>b.author.name===args.author)
          }
          if(args.genre!==undefined){
              booksToReturn=booksToReturn.filter(b=>b.genres.includes(args.genre))
          }

          return booksToReturn
        
        },


      allAuthors:()=>{
        return Author.find({})
      }
  },
  Author:{
    bookCount:async (root)=>{
        const books=await Book.find({author:{$in:root.id}})
        return books.length     
        }
    },
    Book:{

    }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:async({req})=>{
    const auth=req?req.headers.authorization:null
    if(auth&&auth.toLowerCase().startsWith('bearer')){
      const decodedToken=jwt.verify(
        auth.substring(7),JWT_SECRET
      )
      const currentUser=await User.findById(decodedToken.id)
      return {currentUser}
    }
  }
})

server.listen().then(({ url,subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})