const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentsSchema = new Schema({
     
    user: {
        
            type: Schema.Types.ObjectId,
            ref: 'users'
    
       
        },
    text: {
        type: String,
        required:true
        
    },
    
     username:{
        type:String,
    },

    userpicture:{
        type:String,
    },


    date:{
        type:Date,
        default:Date.now
    },

    itineraryId:{

        type:String,
    }
   
})
module.exports =Comment=mongoose.model('comment',commentsSchema)