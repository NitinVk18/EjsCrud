const express = require('express');
const app = express();
const cors  = require('cors');
const bodyParser = require('body-parser');
const mySql = require('mysql2');
const ejs =require('ejs');
const path = require('path')

var conn = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vk18@ro45',
    database: 'customerdata'
})

conn.connect(function(err){
    if(err) throw err;
    console.log('Connected Successfully');
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res){
    var sql2 = 'select * from cdata'
    conn.query(sql2, function(err, result){
        if(err) throw err;
        console.log(result);
        res.render('home' , {"a": result})
    })
    
})

app.post('/addingData', function(req, res){
    let id = req.body.id;
    let name = req.body.name;
    let address = req.body.address;
    let phone = req.body.phone;
    let desig = req.body.desig;

    var sql =  `insert into cdata values ('${id}', '${name}', '${address}', '${phone}', '${desig}')`;
    conn.query(sql, function(err){
        if(err) throw err;
        res.redirect('/')
    })
    

})


app.get('/deleteData/:id',(req,res)=>{
    let del = req.params.id;
    var sql = 'delete from cdata  where id = '+del;
    conn.query(sql, function(err){
        if(err) throw err;
        res.redirect('/')
    })
})
app.get('/editData/:id',(req,res)=>{
    var sql = `select * from cdata where id= ${req.params.id}`
   
    conn.query(sql, function(err, result){
        if(err) throw err;
        console.log(result);
        res.render('edit', {'b': result})
    })
})


app.post('/updateData',(req,res)=>{

    let name = req.body.n1;
    let adr = req.body.n2;
    let ph = req.body.n3;
    let des = req.body.n4;
    let cid = req.body.myid;

    let sql = ` update cdata set name = '${name}' , address = '${adr}', phone = '${ph}', designation = '${des}' where id = '${cid}' `


    // var sql = `update cdata set name = ${req.body.name} , adress = ${req.body.address}`
    conn.query(sql, function(err){
        if(err) throw err;
       
        res.redirect('/')
    })
})


app.listen(8000);
