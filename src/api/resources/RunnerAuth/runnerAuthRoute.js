import  customerotpCtrl  from"./runnerAuthCtrl"
import express from 'express';
import { sanitize } from '../../../middleware/sanitizer';
// import upload from'../../../awsavtar'
import upload from '../../../awsbucket';


export const runnerRouterOtp = express.Router();
runnerRouterOtp.route('/sendotp').post(sanitize(),async (req,res,next)=>{
    try{
        const otp = await customerotpCtrl.sendOtp(req,res)
        res.send(otp)
        
    }catch(err){
        res.send(err)
    }
})
runnerRouterOtp.route("/createrunner").post(sanitize(), upload.single('avatar'),async(req,res,next)=>{
    try{
        const runner= await customerotpCtrl.createrunner(req,res,)
        res.send(runner);
    }catch(err){
           next(err)
       }
})


runnerRouterOtp.route('/verify-otp').post(sanitize(),async (req,res,next)=>{
    try{
        const otp = await customerotpCtrl.verifyotp(req,res)
        res.send(otp)
    }catch(err){
           next(err)
       }
})

runnerRouterOtp.route('/activate/:id').put(sanitize(), upload.single('avatar'),async (req,res,next)=>{
     try{
     const otp = await customerotpCtrl.activate(req,res,next)
     res.send(otp)
  }catch(err){
           next(err)
       }
})

runnerRouterOtp.route('/getby/:id').get(sanitize(),async (req,res,next)=>{
     try{
     const otp = await customerotpCtrl.profilegetbyid(req,res,next)
     res.send(otp)
  }catch(err){
           next(err)
       }
})
runnerRouterOtp.route('/delete/:id').delete(sanitize(),async (req,res,next)=>{
     try{
     const otp = await customerotpCtrl.deletecustomer(req,res,next)
     res.send(otp)
  }catch(err){
           next(err)
       }
})

runnerRouterOtp.route('/getrunnerauth').get(sanitize(),async (req,res,next)=>{
     try{
     const otp = await customerotpCtrl.getAllcustomerList(req,res,next)
     res.send(otp)
  }catch(err){
           next(err)
       }
})


runnerRouterOtp.route('/logout').get(sanitize(),async(req ,res,next)=>{
    try{
        const log = await customerotpCtrl.logout(req,res,next)
        res.send(log)
    }catch(err){
           next(err)
       }
})

runnerRouterOtp.route('google').get(sanitize(),async(req ,res,next)=>{
    try{
        const log = await customerotpCtrl.googleLogin(req,res,next)
        res.send(log)
    }catch(err){
           next(err)
       }
})

runnerRouterOtp.route('facebook').get(sanitize(),async(req ,res,next)=>{
    try{
        const log = await customerotpCtrl.facebookLogin(req,res,next)
        res.send(log)
   }catch(err){
           next(err)
       }
})