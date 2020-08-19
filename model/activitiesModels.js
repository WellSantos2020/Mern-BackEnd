const mongoose = require('mongoose')
const activitySchema = new mongoose.Schema({
   title: {
       
        type: String,
        required: true
        
    },
    pictures: {
        type: String,
        
    },
    itineraryId: {
        type: String,
    }
}) 

module.exports = mongoose.model('activity', activitySchema)