const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');
const {generateToken} = require('../utils/generateToken');


module.exports.registerUser = async function(req,res){
    try{
        let {fullname, email, password} = req.body;
        
        let user = await userModel.findOne({email: email})
        if(user) return res.status(400).send('user already exits , please login')


        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt, function(err,hash){
                if(err) return res.send(err.message);
                else {
                     let user = userModel.create({
                        fullname,
                        email,
                        password: hash
                    })
                    let token = generateToken(user);
                    res.cookie('token', token);
                    res.send("user created sucessfully");                }
            })
        });

       
    }catch(err){
        res.send(err.message);
    }
}

module.exports.loginUser = async function(req,res){
    let {email ,password} = req.user;
    let user = await userModel.findOne({email:email,});
    if(!user) return res.send("incorrect email or password");

    bcrypt.compare(password, user.password,function(err,result){
        if(result){
            let token = generateToken(user);
            res.cookie('token', token);
            res.send('you can login');
        }else{
            return res.send("incorrect email or password");
        }
    })

    
}