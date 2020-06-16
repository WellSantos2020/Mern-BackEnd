const express = require('express')

const router = express.Router()
const itineraryModel=require("../model/itineraryModels")

router.get('/test', (req, res) => {
    res.send({ msg: 'Cities test route.' })
})




    router.get('/:id',
	(req, res) => {
		console.log(req.params.id)
  		
  		itineraryModel.find({ cityId: req.params.id })
			.then(itinerary => {
				res.send(itinerary)
				console.log(itinerary)
			})
			.catch(err => console.log(err));
});
 
/* router.get('/all',
	(req, res) => {
		
  		
  		itineraryModel.find({})
			.then(itineraries => {
				res.send(itineraries)
				console.log(itineraries)
			})
			.catch(err => console.log(err));
});
 */


module.exports = router