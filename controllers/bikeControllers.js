const Bike = require('../models/bike')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: '../uploads',
    filename: (req, file, cb) =>{
        cb(null, file.originalname + '_' + Date.now())
    }
})

const upload = multer({
    storage: storage
}).single('img')



const index = async (req, res) =>{
    let allBikes = await Bike.find({})
res.render('index.ejs', {allBikes})

}

let show =(req, res) =>{
    console.log(req.params.bikeId)

    Bike.findById(req.params.bikeId).then((bike) =>{
        console.log(bike)
        res.render('bikeShow', {bike})
    })
}

let createBike = (req, res) =>{
    upload(req, res, (err) =>{
    let newBikes = new Bike(req.body)
    // let newBikes = new Bike({
    //     name: req.body.name,
    //     model: req.body.model,
    //     price: req.body.price,
    //     color: req.body.color,
    //     img: req.file.filename
    // })
    newBikes.save(()=> console.log("Bike has been listed"))
    res.redirect('/bikes')
    })
}


let newBike = (req, res) => {
    res.render('new.ejs')
}

let deleteIt = async (req, res) =>{
    console.log(`Bike listing deleted.`)
    
    // Bike.findByIdAndDelete(req.params.bikeId)
    await Bike.deleteOne({_id: req.params.bikeId})
    res.redirect('/bikes')
}

let update = async (req, res) =>{
    console.log('Update Function Used')
    console.log(req.params.bikeId)
    await Bike.findByIdAndUpdate(req.params.bikeId, req.body)
    res.redirect(`/bikes/${req.params.bikeId}`)
}


module.exports = {

    index,
    show,
    newBike,
    createBike,
    deleteIt,
    update
}








