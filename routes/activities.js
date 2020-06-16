const express = require('express')

const router = express.Router()
const activitiesModels=require("../model/activitiesModels")



router.get('/:id',
	(req, res) => {
		console.log(req.params.id)
  		
  		activitiesModels.find({ itineraryId: req.params.id })
			.then(activities => {
				res.send(activities)
				console.log(activities)
			})
			.catch(err => console.log(err));
});

module.exports=router;