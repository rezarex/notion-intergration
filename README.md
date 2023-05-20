# Salesforce to Notion Migrator

This script migrates data from Salesforce to Notion. The script gets data from two properties in Salesforce, Contacts and Accounts.

## Requirements

* Node.js
* Salesforce API credentials
* Notion API credentials

## Usage

To use the script:
1. Clone the repository
2. Run `npm install` to install the dependencies
3. Ensure to check the .envsample so as to create you own .env file with all the required configurations
4. Run `npm start` to start the service. It is configured to run with 'forever' module
5. To migrate Accounts info, use the route "{your_base_url}:5000/import/accounts"
6. To migrate Contacts info, use the route "{your_base_url}:5000/import/contacts"

These routes may be used in both the browser or using an API platform like POSTMAN, ensure to use get request.

