const express = require('express');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { validateLoginInput, validateRegisterInput} = require('../utils/validator');
const router = express.Router()


// register

router.post('/user', async (req,res)=>{
    const username = req.body.username
    const email = req.body.email
    let password = req.body.password
    // const profileImage = req.body.profileImage


    console.log(req.body)

    const {valid,errors} = validateRegisterInput(username, email, password);

    if(!valid){
        res.send({'error': errors})
    }

    console.log('user register')


    const user = await userModel.findOne({username})

    if(user){
        errors.general = 'Username already taken'
        res.send({'error': errors})
    }

    let hashPassword = await bcrypt.hash(password,10);

    const newUser = new userModel ({
        username,
        email,
        password: hashPassword,
        // profileImage: profileImage !== null ? profileImage : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
        createdAt: new Date().toISOString()
    })

    const response = await newUser.save();

    const token = jwt.sign({username:response.username},'secret')

    res.status(200).send({'token': token, 'data': {'id': response._id,'username': response.username,'email': response.email, 'createdAt': response.createdAt}})
})

// login

router.get('/user', async (req,res)=>{
    const username = req.query.username
    let password = req.query.password

    const {valid,errors} = validateLoginInput(username, password);

    console.log('user login')

    if(!valid){
        res.send({'error': errors})
    }

    const user = await userModel.findOne({username})

    if(!user){
        errors.general = 'user not found'
        res.send({'error': errors})
    }

    let match = await bcrypt.compare(password,user.password);

    if(!match){
        errors.general = 'Wrong credentials'
        res.send({'error': errors})
    }

    const token = jwt.sign({username:user.username},'secret')

    res.status(200).send({'token': token, 'data': {'id': user._id,'username': user.username,'email': user.email, 'createdAt': user.createdAt}})
})


module.exports = router;