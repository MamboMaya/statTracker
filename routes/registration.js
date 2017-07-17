const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/register', function(req, res){
  const user = new User()
  user.username = req.body.username
  user.password = req.body.password
  user.save()
  .then(function(user){
    res.status(201).json({
      user: user
    })
  })
  .catch(function(err){
    res.status(422).json({
      err: err
    })
  })
})

router.post('/login', function(req, res){
  res.redirect('api/activities')
})

module.exports = router
