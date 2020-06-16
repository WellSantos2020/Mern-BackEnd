const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
   name: {
       
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    
   goath: {

    type: Boolean,
   },

   loggedin:{
       
    type:Boolean,
   },
   
   
    password: {
       
        type: String,
        required: function validate() {
            if (this.goath) {
                return false;
            } else {
                return true;
            }
        }
    
    
    },
    image: {
        type: String,
    },
    favorites:{

        type:Array,
        
    }


}) 
 


module.exports = mongoose.model('user', userSchema)