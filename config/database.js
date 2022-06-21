const mongoose = require('mongoose')

//Connecting database
mongoose.connect(process.env.DATABASE_URL), {
    useNewUrlParser: true
}

const db = mongoose.connection

db.on('connected', ()=>{
    console.log(`Connected to database at ${db.host}:${db.port}`)
})




// 'mongodb://localhost:27017/Project2'