const express = require('express')

const router = express.Router()
const cityModel=require("../model/cityModels")

router.get('/test', (req, res) => {
    res.send({ msg: 'Cities test route.' })
})


router.get('/all',
    (req, res) => {
        cityModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
});


router.get('/:name',
	(req, res) => {
  		let cityRequested = req.params.name;
  		cityModel.findOne({ name: cityRequested })
			.then(city => {
				res.send(city)
			})
			.catch(err => console.log(err));
});

module.exports = router