const express = require('express');
const app = express();
require('dotenv').config();
const jsforce = require('jsforce');
const PORT = process.env.PORT || 3000;
const logger = require('./logger')
const {importAccounts, importContacts} = require('./notion')


app.get('/', (req, res)=>{
   res.send("Salesforce Notion Intergration")
})

app.use('/import/contacts',importContacts);
app.use('/import/accounts', importAccounts)

const start = async () => {
    try {

        app.listen(PORT, logger.info(`server is live on PORT ${PORT}..`))
    } catch (error) {
        console.log(error)
    }
}

start();