const express = require('express')
const app = express()
const mustache = require('mustache-express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const User = require('./models/User')
const registrationRoute = require('./routes/registration')
const homepageRoute = require('./routes/homepage')

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/stattracker')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.set('layout', 'layout')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

passport.use(new BasicStrategy(
  function(username, password, done){

  User.findOne({username: username, password: password})
  .then(function(user){
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
}))

app.use(homepageRoute)
app.use(registrationRoute)
app.use(passport.authenticate('basic', {session: false}))


app.listen(3000, function(){
  console.log('GOOD TO GO!!!!')
})
