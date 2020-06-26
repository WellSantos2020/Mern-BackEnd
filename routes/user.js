const express = require('express')
const { check, validationResult } = require('express-validator');
const router = express.Router()
const userModel=require("../model/userModels");
const itineraryModels=require("../model/itineraryModels");
const bcrypt = require('bcrypt');
const key = require("../keys");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const { findById } = require('../model/userModels');




 router.post('/addfavorites',passport.authenticate("jwt", { session: false }), async(req,res)=>{
   
let user= await userModel.findOne({_id:req.user.id}) ;
console.log(user)
const myId=req.body.itineraryId
let result= user.favorites.filter(element=>element.itineraryId==myId)
console.log(result.length)
if(result.length!==0){
  res.status(400).send('User already liked')
  }
  
  await itineraryModels.findById({_id:req.body.itineraryId})
 .then(itin=>{
 
  user.favorites.push({title:itin.title,itineraryId:itin._id,cityId:itin.cityId})

  res.send(user.favorites)
  user.save()
 })

.catch(err=>res.json({errors:err.message}))

});

  router.post('/removefav/:id',passport.authenticate("jwt", { session: false }), async(req,res)=>{
   
   await userModel.findById({_id:req.user.id})
    .then(user=>{
     let result=user.favorites.filter(favorite=>favorite.itineraryId==req.params.id)
     console.log(result)
     console.log(user.favorites)
     
     let indextoremove=user.favorites.map(favorite=>favorite.itineraryId).indexOf(req.params.id);
      user.favorites.splice(indextoremove,1)
      user.save()
      res.send(user.favorites)


    })

  });



router.post('/register',[
    check('name').isLength({min:3}),
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
  ], async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const {
      email,
      password,
      name,
      image
  } =req.body

    try {
        
        let user=await userModel.findOne({email})
        if(user){
          return  res.status(400).json({errors:{msg:'User already exists'}}) 

        }
        user=new userModel({
            email,
            password,
            name,
            image,
            goath:false,
            loggedin: false
        })
        const salt=await bcrypt.genSalt(10)
        user.password= await bcrypt.hash(password,salt)
        console.log(user)
        
        await user.save()
        //return res.status(200).json(user);
      
        const payload = {
          id: user.id,
          username: user.username,
          avatarPicture: user.avatarPicture
};
       
       
       
        const options = {expiresIn: 2592000};
        jwt.sign(
          payload,
          key.secretOrKey,
          options,
          (err, token) => {
            if(err){
              res.json({
                success: false,
                token: "There was an error"
              });
            }else {
              res.json({
                success: true,
                token: token
              });
            }
          }
        );
        
        
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
        
    }
})

router.get('/getfav',passport.authenticate("jwt", { session: false }), async(req,res)=>{

  await userModel.findById({_id:req.user.id})
  .then(user=>res.send(user.favorites))

  
}

)





 

 
 module.exports = router
