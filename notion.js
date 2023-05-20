const { Client } = require('@notionhq/client');
require('dotenv').config();
const asyncHandler = require('express-async-handler')
const {getAccounts, getContacts} = require('./salesforce')


const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });


  const createContactsTable = asyncHandler(async(req, res)=>{
    const response = await notion.databases.create({
        parent: {
          page_id: process.env.NOTION_CONTACT_PAGE,
        },
        title: [
          {
            type: 'text',
            text: {
              content: 'Contacts',
            },
          },
        ],
        properties: {
            Id: {
                title: {},
              },
            Name: {
            title: {},
          },
          Email: {
            rich_text: {},
          },
          Phone: {
            title: {},
          },
          Department: {
            rich_text: {},
          },
        },
      });
  });

  const createAccountsTable = asyncHandler(async(req, res)=>{
    const response = await notion.databases.create({
        parent: {
          page_id: process.env.NOTION_ACCOUNTS_PAGE,
        },
        title: [
          {
            type: 'text',
            text: {
              content: 'Accounts',
            },
          },
        ],
        properties: {
          Name: {
            title: {},
          },
          Description: {
            rich_text: {},
          },
        },
      });
  });




  const importAccounts = asyncHandler(async(req, res)=>{
    try {
        createAccountsTable();
    } catch (error) {
        throw new Error(error)
    }

  })


  const importContacts = asyncHandler(async(req, res)=>{
    try {
        createContactsTable();
    } catch (error) {
        throw new Error(error)
    }
  })
//get pooled data from salseforce.js
//initialize notion API
//send data to notion