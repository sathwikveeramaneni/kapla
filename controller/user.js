const jwt = require('jsonwebtoken');
const User = require('../model/user');
const File = require('../model/file');
const bcrypt = require('bcrypt');
const csvtojson = require("csvtojson");
const express = require('express');
const Upload=require("express-fileupload");
express().use(Upload());
const bodyParser = require('body-parser');
express().use(bodyParser.urlencoded({extended: true}));


exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({email});
    
    // Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if(userExist) return res.status(400).send('Email already exists');
    
    try {
        const user = await User.create({ name, email, password: hashPassword });
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.status(200).send({
            token,
            id: user._id
        });
    } catch(e) {
        res.sendStatus(400);
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email });

    if(!user)  return res.status(400).send('Email not found');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.sendStatus(401);

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.status(200).send({
        token,
        id: user._id
    })
}


    

exports.insertdata = async (req, res) => {
    
    const { name,gender,phonenumber} = req.body;
    const userExist = await File.findOne({phonenumber:phonenumber });
    if(userExist) res.status(400).send("User exist");

    if(!userExist) {
        await File.create({ name,gender,phonenumber});
        res.sendStatus(200);
    }
} 

exports.removedata = async (req,res)=>
{
    const {phonenumber}=req.body;
    await File.deleteOne({phonenumber:phonenumber});
    res.sendStatus(200);
}

exports.updatedata = async (req,res)=>
{
    const {phonenumber1,phonenumber2}=req.body;
    await File.updateOne({phonenumber:phonenumber1},{$set:{phonenumber:phonenumber2}});
    res.sendStatus(200);
}

exports.searchdata = async (req,res)=>
{
    const {phonenumber}=req.body;
    let deatails=await File.find({phonenumber:phonenumber});
    res.send(deatails);
}


    
        

