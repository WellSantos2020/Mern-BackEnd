const express = require('express')
const router= express.Router()
const passport = require('passport');
const userModel=require("../model/userModels");
const commentsModels=require("../model/commentsModels");





router.post('/addcomments/:id',passport.authenticate("jwt", { session: false }), async(req,res)=>{

    try {
        let user= await userModel.findById(req.user.id).select('-password')
        console.log('test'+user)
        comment=new commentsModels({
            user:user._id,
            username:user.name,
            userpicture:user.image,
            text:req.body.text,
            itineraryId:req.params.id
        })
       res.send(comment) 
       await comment.save()
    } catch (error) {
        res.status(500).send('server error')
        console.log(error.message)
        
    }
})

router.get('/:id',(req,res)=>{
   commentsModels.find({itineraryId:req.params.id})
   .then(comments=>res.send(comments))
   .catch(error=>res.send(error.message))
    
})

 router.delete('/:id',passport.authenticate("jwt", { session: false }), async(req,res)=>{
    try {
        let comment= await commentsModels.findById(req.params.id)
    
    if (!comment){
     return res.status(404).json({message:'Comment not found'})
     }
     
      if(comment.user.toString()!==req.user.id ){
      return  res.status(401).json({message:'Unauthorized user'})
     } 

     await comment.remove()
      res.send('Your comment was deleted');
        
    } catch (error) {
        res.status(500).send('server error')
        console.log(error.message)
    }
    
   
  })
 

  router.put('/:id',passport.authenticate("jwt", { session: false }), async(req,res)=>{
    try {
        let comment= await commentsModels.findById(req.params.id)
    
    if (!comment){
     return res.status(404).json({message:'Comment not found'})
     }
     
      if(comment.user.toString()!==req.user.id ){
      return  res.status(401).json({message:'Unauthorized user'})
     } 

     comment.text=req.body.text


      res.send(comment);
      await comment.save() 
    } catch (error) {
        res.status(500).send('server error')
        console.log(error.message)
    }
    
   
  })
 








module.exports = router 