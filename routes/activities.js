const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Activity = require('../models/Activity')
const moment = require('moment')

router.get('/api/activities', function(req, res){
  User.findOne({_id: req.user._id})
  .then(function(user){
    Activity.find({
      userId: user._id
    })
    .catch(function(err){
    })
    .then(function(activities){
      res.render('activities', {
        user: user,
        activities: activities
      }).json()
    })
    .catch(function(err){
    })
  })
})

router.post('/api/activities', function(req, res){
  User.findOne({_id: req.user._id})
  .then(function(user){
    const activity = new Activity()
    activity.userId = req.user._id
    activity.name = req.body.name
    activity.save()
      .then(function(activities){
        res.redirect('/api/activities')
      })
      .catch(function(err){
        console.log(err)
        res.json({err: err})
      })
  })
})

router.get('/api/activities/:id', function(req, res){
  User.findOne({_id: req.user._id})
    .then(function(user){
      Activity.findOne({_id: req.params.id})
        .then(function(activity){
          res.render('activity', {
            activities: activity
          })
        })
        .catch(function(err){
          console.log('catch err!', err.message)
        })
    })
})


router.post('/api/activities/:id/stats', function(req, res){
  User.findOne({_id: req.user._id})
  .then(function(user){
    Activity.findOne({_id: req.params.id})
    .then(function(activity){
      var newDate = moment().format("MMM Do YY")
      activity.stats.push({
        date: newDate,
        count: req.body.count
      })
      activity.save()
      .then(function(newActivity){
        res.redirect('/api/activities/'+ req.params.id)
      })
      .catch(function(err){
        console.log(err)
      })
    })
  })
})

module.exports = router
