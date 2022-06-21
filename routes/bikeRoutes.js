const express = require('express')
const router = express.Router()
const bikeCtrl = require('../controllers/bikeControllers')
const passport = require('passport')

//Show all available listings
router.get('/', bikeCtrl.index)

//Oauth route
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}))

// Google OAuth callback route
router.get('/oauth2callback/', passport.authenticate(
    'google', {
        successRedirect: '/',
        failureRedirect: '/'
    }
  ))

// OAuth logout route
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

//Form to add new bikes for sale
router.get('/new', bikeCtrl.newBike)

//Post route for new bike listing
router.post('/', bikeCtrl.createBike)

//Show specific listing
router.get('/:bikeId', bikeCtrl.show)

//Update listing
router.patch('/:bikeId', bikeCtrl.update)

// //
router.delete('/:bikeId', bikeCtrl.deleteIt)

module.exports = router

