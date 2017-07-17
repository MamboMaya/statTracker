const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
  userId: {type: String, required: true},
  name: {type: String, required: true},
  stats: [{
    date: {type: String},
    count: {type: String}
  }]
})

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity
