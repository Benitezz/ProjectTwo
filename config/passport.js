const passport = require('passport')
// const  newBike  = require('../controllers/bikeControllers')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const Bike = require('../models/bike')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
},
    function(accessToken, refreshToken, profile, cb){
        Bike.findOne({'googleId': profile.id}, function(err, bike){
            if(err) return cb(err)
            if(bike){
                return cb(null, bike)
            } else {
                const newBike = new Bike({
                    googleId: profile.id
                })
                newBike.save(function(err){
                    if(err) return cb(err)
                    return cb (null, newBike)
                })
            }
        })
    }
))

passport.serializeUser(function(bike, done){
    done(null, bike.id)
})

passport.deserializeUser(function(id, done){
    Bike.findById(id, function(err, bike){
        done(err,bike)
    })
})