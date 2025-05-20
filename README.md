
# Assesment - Book Review system

## pull Repository

git clone <your-repository-link>


## install all the necessary dependencies

npm install

## setup .env file
at root of the folder
#### JWT=your_jwt_secret_key
#### MONGO_URI=your_mongodb_connection_link

## Start server

##### npm run dev

Upon running it you will see the 2 print statements as 

server listnening on post 3000

Db is connected sucessfullyy

if you are not seeing this then there might to an issue please check proper db connection and start again


## Api testing

import this api_link in your postman 

Api_link : https://api.postman.com/collections/26762585-393a1fcf-7cc9-4640-845c-2153279778e2?access_key=PMAT-01JVPDN4V219KXXDHC8VW7SP65

this will display all the saved test apis at the time i have tested

also note that the session will end (token time will expire on specific time)

the structure of the project is as above
you will find the main routes in index.js

## video link of testing the apis
Link : https://drive.google.com/file/d/1FpRT5OoOcOuOyNgUtz4lgov5F0aH7uv2/view?usp=sharing

## Structure
- **routes/** handles URL endpoints,
- **controllers/** contains the logic for each route,
- **models/** defines your data structure and database schema.
## Database schemas

- the data base schema is of three models using mongoose and mongodb
- user model (for user info like name,email,password)
- book model (title ,author,genre etc...)
- review model (review,rating)
- The review model if connected to book and user model by ref
