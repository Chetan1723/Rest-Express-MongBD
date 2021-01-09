const location = require('../models/location')
var LatLon = require('mt-latlon')

module.exports = (app) => {
  /* GET home page. */
  app.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' })
  })

  app.get('/allDetailLocations', async (req, res) => {
    const data = await location.find()

    try {
      res.send(data)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  app.post('/addLocation', async (req, res) => {
    const data = new location(
      {
        _id: req.body.name.toUpperCase(),
        name: req.body.name,
        city: req.body.city,
        country: req.body.country,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      },
      { unique: true }
    )
    try {
      await data.save()
      res.send(data)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  app.delete('/deleteLocation', async (req, res) => {
    try {
      const data = await location.findByIdAndDelete(
        req.body.locationId.toUpperCase()
      )
      if (!data) res.status(404).send('No location found')
      res.status(200).send('location deleted')
    } catch (err) {
      res.status(500).send(err)
    }
  })

  app.get('/searchLocation', async (req, res) => {
    try {
      const data = await location.findById(req.body.locationId.toUpperCase())
      if (!data) res.status(404).send('No location found')
      res.status(200).send(data)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  app.patch('/updateLocation', async (req, res) => {
    try {
      await location.findByIdAndUpdate(req.body.name.toUpperCase(), req.body)
      res.send('location updated')
    } catch (err) {
      res.status(500).send(err)
    }
  })

  app.get('/locInRadius', async (req, res) => {
    try {
      const result = await location.find()
      if (result.length != 0) {
        var data = []
        var p1 = new LatLon(req.body.Lat, req.body.Lon)
        result.forEach((element) => {
          var p2 = new LatLon(element.latitude, element.longitude)
          if (Number(p1.distanceTo(p2)) <= Number(req.body.Rad)) {
            data.push(element)
          }
        })
        res.send(data)
      } else res.send({ data: 'No Locations in Radius :(' })
    } catch (err) {
      res.status(500).send(err)
    }
  })
}
