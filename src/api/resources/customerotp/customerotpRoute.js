import  customerotpCtrl  from"./customerotpCtrl"
import express from 'express';
import { sanitize } from '../../../middleware/sanitizer';
// import upload from'../../../awsavtar'
import upload from '../../../awsbucket';


export const customerRouterOtp = express.Router();
customerRouterOtp.route('/sendotp').post(sanitize(),async (req,res,next)=>{
    try{
        const otp = await customerotpCtrl.sendOtp(req,res)
        res.send(otp)
        
     }catch(err){
           next(err)
       }
})


customerRouterOtp.route('/verify-otp').post(sanitize(),async (req,res,next)=>{
    try{
        const otp = await customerotpCtrl.verifyotp(req,res)
        res.send(otp)
    }catch(err){
           next(err)
       }
})

customerRouterOtp.route('/activate/:id').put(sanitize(), upload.single('avatar'),async (req,res,next)=>{
     try{
     const otp = await customerotpCtrl.activate(req,res)
     res.send(otp)
   }catch(err){
           next(err)
       }
})
customerRouterOtp.route('/createByadmin').post(sanitize(),async (req,res,next)=>{
     try{
     const otp = await customerotpCtrl.admincreatecustomer(req,res)
     res.send(otp)
   }catch(err){
           next(err)
       }
})

customerRouterOtp.route('/getby/:id').get(sanitize(),async (req,res,next)=>{
     try{
     const otp = await customerotpCtrl.profilegetbyid(req,res)
     res.send(otp)
   }catch(err){
    next(err)
   }
})
customerRouterOtp.route('/delete').delete(sanitize(),async (req,res,next)=>{
     try{
     const otp = await customerotpCtrl.deletecustomer(req,res)
     res.send(otp)
   }catch(err){
           next(err)
       }
})

customerRouterOtp.route('/getcustomer').get(sanitize(),async (req,res,next)=>{
     try{
     const otp = await customerotpCtrl.getAllcustomerList(req,res)
     res.send(otp)
    }catch(err){
           next(err)
       }
})

customerRouterOtp.route('/logout').get(sanitize(),async(req ,res,next)=>{
    try{
        const log = await customerotpCtrl.logout(req,res)
        res.send(log)
    }catch(err){
           next(err)
       }
})

customerRouterOtp.route('google').get(sanitize(),async(req ,res,next)=>{
    try{
        const log = await customerotpCtrl.googleLogin(req,res)
        res.send(log)
      }catch(err){
           next(err)
       }
})

customerRouterOtp.route('facebook').get(sanitize(),async(req ,res,next)=>{
    try{
        const log = await customerotpCtrl.facebookLogin(req,res)
        res.send(log)
    }catch(err){
           next(err)
       }
})