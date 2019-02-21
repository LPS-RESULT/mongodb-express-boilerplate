# MongoDB Express Boilerplate

This is a boilerplate for the mongodb and express tandem; made with RESTful patterns.

## Directory

The directory structure is rather simplistic. It contains the `/app/` folder which contains
most of server source, and a `/tests/` folder for test suites

### /app

Server files are contained here.

#### /app/models

This directory contains the models that are 

#### /app/routes

Routes are router files that define the API

#### /app/services

Services do all the work for the API are defined here

### /tests

Contains all the test suites for the API

## App Setup and environment file

First off install the app basic dependencies by:

    $ npm install
    
Create a file named `.env`, within the directory,
You can then edit that with a text editor you like:

    # Default Local Environment
    APP_PORT=80
    DB_HOST=localhost
    DB_PORT=27017
    DB_NAME=sample
    
You can go ahead and change the values as needed. By default this should work
on your local environment.

## Setup Mongodb

We need to create a repo file first:

	sudo vim /etc/yum.repos.d/mongodb-org-3.6.repo
	
Then append the following:

	[mongodb-org-3.6]
	name=MongoDB Repository
	baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.6/x86_64/
	gpgcheck=1
	enabled=1
	gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc
	
Then install mongodb latest via: 

	sudo yum install -y mongodb-org
	 
We can then start the mongod service via:

	sudo service mongod start
	
TO ensure it gets restarted on reboot:

	sudo chkconfig mongod on
	
## Running the app

You can then run the server by hitting

    $ npm start
    
this is equivalent to running the server script

    $ node server.js

### Running tests

To run tests, simply invoke:

    npm test
    
This is a shortcut to using mocha:

    mocha tests/**/*.js --reporter spec --timeout 30000

### Running the App

When `server.js` is run, this will expose the API; you can start navigating by visiting on your browser:

    http://localhost/user

## License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.