const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express();


//Create mysql db connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'scaler_class'
})

//Connect to the database
connection.connect((err)=>{
    if(err){
        console.log("Cannot connect to the database...",err);
        return;
    }
    else console.log("Connected to the database...");
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.post('/api/data',(req,res)=>{
    console.log('body : ',req.body);
    const {id} = req.body;
    //Insert the data into the table
    const query = `select * from student where studentID = ${id};`
    connection.query(query,(err,result)=>{
        if(err) {
            console.log('Error occoured : ',err);
            res.status(500).json({error: 'Internal error'})
            return;
        }
        console.log('result : ',result[0]);
        res.status(200).json({result});
        return;
    })

})

/* app.get('/',(req,res)=>{
    res.send('Hello Express...')
}) */

app.listen(3000, ()=>{
    console.log("Server started on port: 3000");
})