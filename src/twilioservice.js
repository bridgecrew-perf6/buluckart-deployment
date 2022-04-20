const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true,
});


const sendBySms = (phone, otp)=>{
    
     return twilio.messages.create({
        to: phone,
        from: process.env.SMS_FROM_NUMBER,
        body: `Your codershouse OTP is ${otp}`,
    });
}

module.exports ={
    sendBySms
}