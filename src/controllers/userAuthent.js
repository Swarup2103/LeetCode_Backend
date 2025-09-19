const User = require('../models/user');
const validator = require('../utils/validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');

const register = async (req, res)=>{
    try{
        console.log("Incoming body:", req.body);
        validator(req.body);
        const {firstName, emailId, password} = req.body;

        req.body.password = await bcrypt.hash(password, 10);
        req.body.role = 'user';
        //always entered as User
        const user = await User.create(req.body);

        //After entering data into DB
        //Create token
        const token = jwt.sign({_id: user._id, emailId: emailId, role: 'user'}, process.env.JWT_KEY, {expiresIn: 60*60});
        res.cookie('token', token, {maxAge: 60*60*1000});
        res.status(201).send("User registered Successfully...");
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

const login = async (req, res)=>{
    try{
        const {emailId, password} = req.body;

        if(!emailId) throw new Error("Invalid Credentials...");
        if(!password) throw new Error("Inalid Password..");

        const user = await User.findOne({emailId});

        const match = bcrypt.compare(password, user.password);
        if(!match) throw new Error("Inavalid credentials")

        const token = jwt.sign({_id: user._id, emailId: emailId, role: user.role}, 'asdfghjkl', {expiresIn: 60*60});
        res.cookie('token', token, {maxAge: 60*60*1000});

        res.status(200).send("Logged in Successfully...")
    }
catch(err){
    res.status(401).send("Error: "+err);
    //401: Unauthorized access
}
}

//logout feature
const logout = async (req, res)=>{
    try{
        //validate the token(in middleware)
        //add Token in Redis Blocklist record
        const {token} = req.cookies;
        const payload = jwt.decode(token);

        await redisClient.set(`token:${token}`,`Blocked`);
        await redisClient.expireAt(`token:${token}`,payload.exp); //invalid token will remain till its expire time
        res.cookie('token',null,{expires: new Date(Date.now())});
        res.send('User Logout Successfully..')
        //clear the Cookies
    }
    catch(err){
        res.status(503).send('Error: '+err);
    }
}

const adminRegister = async(req, res)=>{
    try{
        validator(req.body);
        const {firstName, emailId, password} = req.body;

        req.body.password = await bcrypt.hash(password, 10);
        req.body.role = 'admin';
        //always entered as User
        const user = await User.create(req.body);

        //After entering data into DB
        //Create token
        const token = jwt.sign({_id: user._id, emailId: emailId, role: 'admin'}, process.env.JWT_KEY, {expiresIn: 60*60});
        res.cookie('token', token, {maxAge: 60*60*1000});
        res.status(201).send("Admin registered Successfully...");
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

module.exports = {register, login, logout, adminRegister};