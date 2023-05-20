const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const jsforce = require('jsforce');
const PORT = process.env.PORT || 3000;
const {SF_TOKEN, SF_USER, SF_PASS, SF_LOGIN_URL} = process.env;







app.get('/', (req, res)=>{
   res.send("Salesforce Notion Intergration")
})




const start = async () => {
    try {

        app.listen(PORT, console.log(`server is live on PORT ${PORT}..`))
    } catch (error) {
        console.log(error)
    }
}

start();