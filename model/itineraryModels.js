const mongoose = require('mongoose')
const itinerarySchema = new mongoose.Schema({
   title: {
        type: String,
        required: true,
        
    },
    profilePicture: {
        type: String,
        required: true
    },
    rating: {
        type: String,
    },

    duration: {
        type: String,
    },

    price: {
        type: String,
    },
    hashtags: {
        type: String,
    },
    
    cityId: {
        type: String,
    }
}) 

module.exports = mongoose.model('itinerary', itinerarySchema)