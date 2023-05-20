const { Client } = require('@notionhq/client');
require('dotenv').config();
const asyncHandler = require('express-async-handler')
const {getAccounts, getContacts} = require('./salesforce')
const logger = require('./logger')



const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });


  const createContactsDb = asyncHandler(async()=>{
    
    const response = await notion.databases.create({
        parent: {
            page_id: process.env.NOTION_CONTACTS_PAGE_ID,
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
            rich_text: {},
                },
          Name: {
            title: {},
            },
          Email: {
            rich_text: {},
          },
          Phone: {
            rich_text: {},
          },
          Department: {
            rich_text: {},
          },
        },
      });
      return response.id
  });

  const createAccountsDb = asyncHandler(async()=>{
    const response = await notion.databases.create({
        parent: {
          page_id: process.env.NOTION_ACCOUNTS_PAGE_ID,
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
            Id: {
                rich_text: {},
              },
            Name: {
            title: {},
          },
        },
      });
      return response.id
  });



  const createAccountPages = asyncHandler(async(databaseId)=>{
    try {
        const accounts = await getAccounts();
        //console.log("data");
        for (const account of accounts) {
            const page = await notion.pages.create({
              parent: { database_id: databaseId },
              properties: {
                Id: { rich_text: [{ text: { content: account.Id || ''} }] },
                Name: { title: [{ text: { content: account.Name || '' } }] },
              },
            });
            logger.info(`Account Added: ${page.url}`);
          }
    } catch (error) {
        logger.error(error);
    }
  })

  const createContactPages = asyncHandler(async(databaseId)=>{
    try {
        const contacts = await getContacts();
        //console.log(contacts);
        for (const contact of contacts) {
            const page = await notion.pages.create({
              parent: { database_id: databaseId },
              properties: {
                Id: { rich_text: [{ text: { content: contact.Id || '' } }] },
                Name: { title: [{ text: { content: contact.Name || '' } }] },
                Email: { rich_text: [{ text: { content: contact.Email || ''} }] },
                Phone: { rich_text: [{ text: { content: contact.Phone || '' } }] },
                Department: { rich_text: [{ text: { content: contact.Department || ''} }] },
              },
            });
            logger.info(`Contact Added: ${page.url}`);
         }
    } catch (error) {
        logger.error(error);
    }
  })


  const importAccounts = asyncHandler(async(req, res)=>{
    try {
        const databaseId = await createAccountsDb();
        await createAccountPages(databaseId)
    } catch (error) {
        logger.error(error)
    }

  })


  const importContacts = asyncHandler(async(req, res)=>{
    try {
        const databaseId = await createContactsDb();
        await createContactPages(databaseId)
    } catch (error) {
      logger.error(error)
    }
  })

  module.exports={importAccounts, importContacts};
