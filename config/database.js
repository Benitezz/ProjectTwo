const mongoose = require('mongoose')

//Connecting database
mongoose.connect('mongodb://localhost:27017/Project2'), {
    useNewUrlParser: true
}

const db = mongoose.connection

db.on('connected', ()=>{
    console.log(`Connected to database at ${db.host}:${db.port}`)
})


// process.env.DATABASE_URL