const express=require('express');
const app=express();
const mysql=require('mysql');
const session=require('express-session');
const bodyParser=require('body-parser');
const path=require('path');

const db=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'nodelogin'
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname+'/login.html'));
});

app.post('/auth', (req, res)=> {
    var id=req.body.id;
    var passwd=req.body.passwd;

    if(id&&passwd) {
        db.query("select * from nodelogin.accounts where id=? and passwd=?", [id, passwd], (err, result, fields)=> {
            if(result.length>0) {
                req.session.loggedin=true;
                req.session.id=id;
                res.redirect('/home');
            } else {
                res.send("Incorrect id and/or password");
            }
            res.end();
        });
    } else {
        res.send("Please enter id and password");
        res.end();
    }
});

app.get('/home', (req, res)=> {
    if(req.session.loggedin) {
        res.send("Welcome back, "+req.session.id+"!");
    } else {
        res.send("Please login to view this page!");
    }
    res.end();
});

app.listen(3033, ()=> {
    console.log("Running on port 3033");
});
