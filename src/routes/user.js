const express=require('express')
const router=express.Router()
const User=require('../models/user')
const auth=require('../middleware/authenticate')

router.post('/signup',async (req,res)=>{
    const user= new User(req.body)
   // console.log(req.body)
    try{
        await user.save()
        const token=  await user.genrateAuthToken()
       
        // console.log(token)
        
          res.status(201).send({user,token})
          
        //res.status(201).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/details',auth,(req,res)=>{
    try{
        res.send(req.user)
       }
       catch(e)
       {
        res.status(500).send(e)
       }
})

router.post('/login',async (req,res)=>{
    try{
        const user= await User.findByCredentials(req.body.email,req.body.password)
       const token=  await user.genrateAuthToken()
      // console.log(token)
      
        res.send({user,token})
    }
    catch(e){
            res.status(404).send()
    }
})



module.exports=router