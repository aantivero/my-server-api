Express.js Server
npm install
SET DEBUG=myserver:* & npm start

Define the following API

Method|  URI                             |Description                                          |
------|----------------------------------|-----------------------------------------------------|
GET   | /contacts                        |retrieve all contacts                                |
GET   | /contacts/:primary-phone-number  |retrieve a single contact by its primary phone number|
POST  | /contacts                        |Update a contact or create a new one                 |
PUT   | /contacts                        |Create a new contact                                 |
DELETE| /contacts/:primary-phone-number  |Delete an existing contact                           |
GET   | /groups                          |Retrieve all available groups                        |
GET   | /groups:group-name               |Retrieve a unique list of all groups asigned         |
DELETE| /groups/:name                    |Deletes a group                                      |

JSON Definition 

{
"firstname": "Joe",
"lastname": "Smith",
"title": "Mr.",
"company": "Dev Inc.",
"jobtitle": "Developer",
"primarycontactnumber": "+359777123456",
"othercontactnumbers": ["+359777456789", "+359777112233"],
"primaryemailaddress": "joe.smith@xyz.com",
"emailaddresses": ["j.smith@xyz.com"],
"groups" : ["Dev", "Family"]
}
