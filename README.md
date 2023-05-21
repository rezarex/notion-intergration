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
7. To stop the script and any subprocesses, use the command `npm stop`

These routes may be used in both the browser or using an API platform like POSTMAN, ensure to use get request.

## Logging and auto restart
The script is configured to save logs in *api.log*
Should the script runs automatically even with bugs, and in case it is stopped, restarts from the stage it stopped.

To check if there are any processes running, use the command `forever list`


