const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')

//Route Variables
const indexRoutes = require('./routes/index.js')
const signUpRoutes = require('./routes/signUp.js')
const loginRoutes = require('./routes/login.js')
const logoutRoutes = require('./routes/logout.js')
const feedRoutes = require('./routes/feed.js')
const profileRoutes = require('./routes/profile.js')
const newPostRoutes = require('./routes/newPost.js')
const postRoutes = require('./routes/post.js')


// .ENV setup
require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

//Connect To Database
connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

//Use forms for put / delete
app.use(methodOverride("_method"));

// Sessions
app.use(
    session({
      secret: 'bigHair',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// Routes
app.use('/', indexRoutes)
app.use('/signUp', signUpRoutes)
app.use('/login', loginRoutes)
// app.use('/logout', logoutRoutes)
app.use('/feed', feedRoutes)
app.use('/profile', profileRoutes)
app.use('/newPost', newPostRoutes)
app.use('/post', postRoutes)

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})   