const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
})

module.exports = mongoose.model('locations', locationSchema)
