const express= require('express');
require('dotenv').config()

const port = process.env.PORT || 8080;
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:"root",
    host: "localhost",
    database: "crud"
});
app.get('/', (req,res) => {
    res.send("server working")
});

app.get('/employee',(req,res) =>{
    db.query("SELECT * FROM employee",(err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.listen(port, () => {
    console.log(`Server established at port ${port}`)
});