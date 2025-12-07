const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');


require('dotenv').config();

const userRouter = require('./routes/userRouter');
const ownerRouter = require('./routes/ownerRouter');
const productRouter = require('./routes/productRouter');
const indexRouter = require('./routes/index');


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECKRET,
    })
);
app.use(flash());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/owners', ownerRouter);
app.use('/products', productRouter);


const db = require('./config/mongoose-connection');

app.get('/',function(req,res){
    res.send("hello world")
})



app.listen(3000,function(){
    console.log("server is running on port 3000");
});