const express = require('express');
require('dotenv').config();
const main = require('./config/db');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/userAuth');
const redisClient = require('./config/redis');
const problemRouter = require('./routes/problemRoute');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/user', authRouter);
app.use('/problem', problemRouter);

const initializeConnection = async ()=>{
    try{
        await Promise.all([main(), redisClient.connect()]);
        console.log('DB & Redis is Connected...')

        app.listen(process.env.PORT, ()=>{
            console.log('Server is listening at Port: '+process.env.PORT);
        })
    }
    catch(err){
        console.log('Error: '+err);
    }
}

initializeConnection();
/*
main()
.then(async ()=>{
        app.listen(process.env.PORT, ()=> {
        console.log('Server listening st port: '+ process.env.PORT);
    })
})
.catch(err => console.log('Error occurred'+err));
*/


