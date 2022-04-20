 import FCM  from 'fcm-node';
    var serverKey = process.env.SERVER_KEY;
    var fcm = new FCM(serverKey);


    var message = {
	to:process.env.DEVICE_TOKENS,
        notification: {
            title: 'BuluckCart App Notification',
            body: '{"Message from node js app"}',
        },

        data: { //you can send only notification or only data(or include both)
            title: 'ok cdfsdsdfsd',
            body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
        }

    };
    
   var  notification =(req,res) => {
    console.log("notification is working fine ")
    fcm.send(message, function(err, response) {
        if (err) {
            console.log("Something has gone wrong!"+err);
			console.log("Respponse:! "+response);
        } else {
            // showToast("Successfully sent with response");
            console.log("Successfully sent with response: ", response);
        }

    });
}
 
     module.exports = notification;