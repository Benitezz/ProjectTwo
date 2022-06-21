const express = require('express')
const PORT = 4000
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')
const multer = require('multer')
// const logger = require('morgan')



require('dotenv').config()
require('./db/seeds.json')
require('./config/database')
require('./config/passport')

const bikeRoutes = require('./routes/bikeRoutes')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(session({
    secret: 'Bikes',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())


app.use('/bikes', bikeRoutes)

app.listen(PORT, ()=>{
    console.log(`✅ PORT: ${PORT} 🌟`)
})

module.exports = app;