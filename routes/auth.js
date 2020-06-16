const express = require('express')
const passport= require('passport')
const router = express.Router()
const userModel=require("../model/userModels")
const key = require("../keys");
const jwt = require("jsonwebtoken");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel
      .findOne({ _id: req.user.id })
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(404).json({ error: "User does not exist!" }));
  }
);





router.post('/login',async(req,res)=>{
    

    
    const {
        email,
        password     
    } =req.body

    try {
        
        const user=await userModel.findOne({email})
        console.log(email)
        if(!user){
            res.send("user not found")

        

        }

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
        
    } catch (error) {
        res.status(500).send("server error")
        
    }
    
  })
  router.get('/google', passport.authenticate('google', {
    scope:['profile', "email"]
}));
  router.get('/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res)=> {
    const user=req.user
    payload={
            id: user.id,
            username: user.username,
            avatarPicture: user.avatarPicture
      }

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
      const myToken = "?code=" + token;
      
    res.redirect('http://localhost:3000/cities' +myToken);
    }
  }
);


  });



module.exports = router