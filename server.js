const express = require('express')
const app = express();
const db = require('./mydb');

// Middleware to parse JSON
app.use(express.json());
const Person = require('./Models/Person');

const PersonRoutes = require('./Routes/PersonRoutes');
app.use('/Person', PersonRoutes); // Make sure 'PersonRoutes' is a router, not an object


app.get('/', function (req, res) {
  res.send('Hello Aafu')
})

//Post route to add a person
app.post('/Person',async(req,res)=>{
  try{
    const data = req.body //Assuming the request body contains the person data

    //Create a new person document using the MOngoose model

    const newPerson = new Person(data);

    //Save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

app.get('/Person/:workType',async(req,res)=>{
  try{
    const workType = req.params.workType; //Extract the work type from the URL Parameter
    if(workType =='chef' || workType == 'manager' || workType == 'waiter'){
    const response = await Person.find({work: workType});
    console.log('response fetched');
    res.status(200).json(response);
  }else{
    res.status(404).json({error:'Invalid work type'});
  }
}
catch(err){
  console.log(err);
  res.status(500).json({error:'Internal Server Error'});
}
})



app.listen(2000,()=>{
    console.log('listening on port 2000');
})