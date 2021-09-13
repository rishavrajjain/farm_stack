const express = require('express');
const router = express.Router();

const Resource = require('../models/resource');
const User = require('../models/user');
const auth = require('../middleware/auth');
const sgMail = require('@sendgrid/mail')


const sendGridApiKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendGridApiKey);
const templates = {
    farm_stack: "d-29321310176e475eafefdbe90d56df7f",
  };

router.get('/resources',async(req,res)=>{
    const skip= +(req.query.skip || '0')//Parsing it to a number
    const limit = +(req.query.limit || '0')

    try{
        const resources = await Resource.find({}).limit(limit).skip(skip).sort({
            'createdAt':-1
        })
        const totalResources = await Resource.count({});
        res.status(200).json({
            data:resources,
            count:totalResources
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            data:{
                message:'Something went wrong.Please try again'
            }
        })
    }
})

router.get('/resource/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const resource = await Resource.findOne({_id:id});
        res.status(200).json({
            data:resource
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            data:{
                message:'Something went wrong.Please try again'
            }
        })
    }
})

router.post('/resource/add',auth,async(req,res)=>{
    try{
        const resource = new Resource(req.body);
        resource.owner = req.user._id.toString();
        await resource.save();
        req.user.resources.push(resource._id.toString());
        await req.user.save();
        res.status(200).json({
            data:resource
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            data:{
                message:'Something went wrong.Please try again'
            }
        })
    }
})

router.patch('/resource/:id',auth,async(req,res)=>{
    const id = req.params.id;
    try{
        const resource = await Resource.findOne({_id:id});
       

        resource.title = req.body.title;
        resource.content = req.body.content;
        await resource.save();

        res.status(200).json({
            data:resource
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            data:{
                message:'Something went wrong.Please try again'
            }
        })
    }
})

router.delete('/resource/:id',auth,async(req,res)=>{
    const id = req.params.id;
    try{
        const resource = await Resource.findOne({_id:id});
 

        if(!resource){
            res.status(404).json({
                data:{
                    message:'Resource not found'
                }
            })
        }

        await Resource.findByIdAndDelete({_id:id});

        res.status(200).json({
            data:{
                message:'Resource Deleted'
            }
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            data:{
                message:'Something went wrong.Please try again'
            }
        })
    }
})

router.patch('/update/status/:id',async(req,res)=>{
    try{
        const resource = await Resource.findOne({_id:req.params.id});
        resource.status = req.body.status;
        await resource.save();
        res.status(200).json({
            data:'Status updated Successfully'
        })
    }catch(err){
        res.status(500).json({
            data:{
                message:'Errro'
            }
        })
    }
})


router.post('/user/resources/',auth,async(req,res)=>{
    try{
        const resources = await Resource.find({owner:req.user._id.toString()});
        res.status(200).json({
            data:resources
        })
    }catch(err){
        res.status(500).json({
            data:err
        })
    }
})

router.post('/resource/complete/:id',async(req,res)=>{
    try{
        const resource = await Resource.findOne({_id:req.params.id});
        resource.status = 'PROCESSED';
        await resource.save();
        const fromEmail = process.env.SENDGRID_EMAIL_ID;
        const user = await User.findOne({_id:resource.owner});
        const msg  = {
        to: user.email,
        from: fromEmail,
        templateId: templates['farm_stack'],
        dynamicTemplateData: {
           title:req.body.title,
           content:req.body.content
        }
      };
      await sgMail.send(msg);
      res.status(200).json({
          data:'Done'
      })
    }catch(err){
        console.log(err);
        res.status(500).json({
            data:err
        })
    }
})





module.exports = router;