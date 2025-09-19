const express = require('express');
const {register, login, logout, adminRegister} = require('../controllers/userAuthent');
const userMiddleware = require('../middleware/userMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const authRouter = express.Router();

//register
//login
//logout
//getProfile
authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',userMiddleware,logout);
authRouter.post('/admin/register', adminMiddleware, adminRegister);
//authRouter.get('getProfile',getProfile);


module.exports = authRouter;