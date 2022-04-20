export default {

    /**
     * Stores the name of Application which can be used 
     * throughout the application. 
     */
    name :  process.env.APP_NAME || "ProjectName",


    /**
     * Specifies the log level which will be used
     * while setting up project Log level
     */
    log  :  process.env.APP_LOG || "dev",

    
    /**
     * Stores the port number on which the application will
     * listen to the requests
     */
    port : process.env.APP_PORT || 800,

    
    /**
     * Stores the secret text which will be used while generating 
     * hash keys
     */
    secret : process.env.APP_SECRET || 'NodeJSProject',

    
    /**
     * Stores the secret text which will be used while generating 
     * hash keys
     */
    url : process.env.APP_URL || 'http://localhost',
    

    /**
     * Stores if server is Secure or not for Secure flag in cookies
     */
    secure : (process.env.APP_SECURE == 'true') || false,

     /**
     * aws secret key 
     */

    AWS_ACCESS_KEY:  process.env.AWSACCESSKEY,

    AWS_SECRET_KEY:  process.env.AWSSECRETKEY,

    AWS_BUCKET:  process.env.AWSBUCKET,

    AWS_REGION:  process.env.AWSREGION,

//customer avtar upload
    //  AWS_ACCESS_KEY1:  process.env.AWSACCESSKEY1,

    // AWS_SECRET_KEY1:  process.env.AWSSECRETKEY1,

    // AWS_BUCKET1:  process.env.AWSBUCKET1,

    // AWS_REGION1:  process.env.AWSREGION1


}