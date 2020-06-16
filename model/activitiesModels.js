const mongoose = require('mongoose')
const activitySchema = new mongoose.Schema({
   title: {
       
        type: String,
        required: true
        
    },
    pictures: {
        type: Array,
        
    },
    itineraryId: {
        type: String,
    }
}) 

module.exports = mongoose.model('activity', activitySchema)