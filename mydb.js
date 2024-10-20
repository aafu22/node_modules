const mongoose = require('mongoose');

//Define the MongoDB connection URL 
const mongoURL = 'mongodb://localhost:27017/mydb'

//Set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection.

const mydb= mongoose.connection;

//Define event listeners for database connection

mydb.on('connected',() => {
    console.log('Connected to MongoDB server');
});

mydb.on('error',(err) => {
    console.log('MongoDB connection error:',err);
});

mydb.on('disconnected',() => {
    console.log('MongoDB disconnected');
});

//Export the database connection
module.exports=mydb;