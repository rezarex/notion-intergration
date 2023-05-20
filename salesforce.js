const express = require('express');
const asyncHandler = require('express-async-handler')
const app = express();
require('dotenv').config();
const jsforce = require('jsforce');
const PORT = process.env.PORT || 3000;
const {SF_TOKEN, SF_USER, SF_PASS, SF_LOGIN_URL} = process.env;
const logger = require('./logger')

const conn = new jsforce.Connection({
    loginUrl: SF_LOGIN_URL,

})

conn.login(SF_USER, SF_PASS+SF_TOKEN, (err, userInfo)=>{
    if(err){
        logger.error(err)
    }
    logger.info("Connection successful!")
    // console.log(userInfo.id);
    // console.log(userInfo.organizationId);
    // console.log("---------------");
    console.log(userInfo);

})


const getAccounts = asyncHandler(async (req, res)=>{

return new Promise((resolve, reject)=>{
    conn.query("SELECT Id, Name FROM Account", (err, result)=>{
        if(err){
            reject(err)
        }
        console.log("Total: " + result.totalSize);
        resolve(result.records);
    })
       
})
})

const getContacts = asyncHandler(async (req, res)=>{

return new Promise((resolve, reject)=>{
    conn.query("SELECT Id, Name, Email, Phone, Department FROM Contact", (err, result)=>{
        if(err){
            reject(err)
        }
        logger.debug("Total: " + result.totalSize);
        resolve(result.records);
    })
       
})

})

module.exports = {getAccounts, getContacts}