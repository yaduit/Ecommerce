const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./routes/userRouter');
const ownerRouter = require('./routes/ownerRouter');
const productRouter = require('./routes/productRouter');

const db = require('./config/mongoose-connection');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/owners', ownerRouter);
app.use('/products', productRouter);

app.get('/',function(req,res){
    res.send("hello world")
})



app.listen(3000,function(){
    console.log("server is running on port 3000");
});