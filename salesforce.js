const express = require('express');
const asyncHandler = require('express-async-handler')
const app = express();
const dotenv = require('dotenv').config();
const jsforce = require('jsforce');
const PORT = process.env.PORT || 3000;
const {SF_TOKEN, SF_USER, SF_PASS, SF_LOGIN_URL} = process.env;

const conn = new jsforce.Connection({
    loginUrl: SF_LOGIN_URL,

})

conn.login(SF_USER, SF_PASS+SF_TOKEN, (err, userInfo)=>{
    if(err){
        console.error(err)
    }
    console.log(userInfo.id);
    console.log(userInfo.organizationId);
    console.log("---------------");
    console.log(userInfo);

})


const getAccounts = asyncHandler(async (req, res)=>{
    conn.query("SELECT Id, Name, Email, Phone, Department FROM Contact", (err, result)=>{
        if(err){
            res.send(err)
        }
        console.log("Total: "+ result.totalrecords);
        res.json(result.records);
    })

})

const getContacts = asyncHandler(async (req, res)=>{
    conn.query("SELECT Id, Name, Email, Phone, Department FROM Contact", (err, result)=>{
        if(err){
            res.send(err)
        }
        console.log("Total: "+ result.totalrecords);
        res.json(result.records);
    })

})

module.exports = {getAccounts, getContacts}