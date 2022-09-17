const express= require('express');
// require('dotenv').config()

const port = process.env.PORT || 8080;
const app = express();
const mysql = require('mysql');
// const cors = require('cors');

// app.use(cors());
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

const db = mysql.createConnection({
    user:"root",
    host: "localhost",
    database: "crud",
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

app.post('/create',(req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const wage = req.body.wage;

    db.query(
        "INSERT INTO employee(name, age, wage) VALUES(?, ?, ?) ",
        [name, age, wage],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send("Values inserted");
            }
        }
    );

});

app.put('/update', (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query("UPDATE employee SET wage = ? WHERE id = ? ", [wage, id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});
app.delete('/deleteEmployee/:id', (req,res) =>{
    const id = req.params.id;
    db.query("DELETE FROM employee WHERE id = ?", id, (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
            // res.send("Delete Success");
        }
    })
});



app.listen(port, () => {
    console.log(`Server established at port ${port}`)
});