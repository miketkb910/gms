const gym = require('../modals/gym');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async(req,res)=>{
    try{
        const {username,password,gymname,email,}= req.body;
        const isexist = await gym.findOne({username})
        if(isexist){
            res.status(400).json({
                error:"user already exists try another username"
            })
        }else{
            const hashedpassword = await bcrypt.hash(password, 10);
            console.log(hashedpassword);
            const newgym = new gym({username,password:hashedpassword ,gymname,email,});
            await newgym.save();
            res.status(201).json({message:"user registered successfully",success:"yes",data:newgym});
        }
    }catch(err){
        res.status(500).json({error:"server error"});
    }
};

const cookieoptions = {
    httpOnly: true,
    secure:false,
    sameSite:'Lax'
};

exports.login = async(req,res)=>{
    try{
        const {username,password} = req.body;
        const isexist = await gym.findOne({username});
        if(isexist && await bcrypt.compare(password,isexist.password)){
            const token = jwt.sign({isexistid:isexist._id},process.env.jwtsecretkey);
            res.cookie('cookietoken',token,cookieoptions);
            res.status(200).json({
                message:"logged in succesfully",success:"true",isexist,token    
            })
        }else{
            res.status(400).json({
                error:"user not found"
            });
        }
    }catch(err){
        res.status(500).json({error:"server error"});
    }
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'miketkb910@gmail.com',
        pass: 'gzrzirkbzuvpthiq'
    }
});

exports.sendotp = async(req,res) => {
    try{
        const {email}= req.body;
        const isexist = await gym.findOne({email});
        if(isexist){
            const buffer = crypto.randomBytes(4);
            const token = buffer.readUInt32BE(0) % 900000 + 100000;
            isexist.resetpasswordtoken=token;
            isexist.resetpasswordexpires=Date.now() + 3600000; 
            await isexist.save();

            mailOptions = {
                from: 'miketkb910@gmail.com',
                to: email,
                subject: 'Reset Password',
                text: `Reset Password otp is: ${token}`
            };
            transporter.sendMail(mailOptions, (error,info)=>{
                if(error){
                    res.status(500).json({error:'server error',errorMsg:error});
                }else{
                    res.status(200).json({message:'otp sent to your email'});
                }
            });            
        }else{
            res.status(400).json({
                error:"gym not found"
            });
        }
    }catch(err){
        res.status(500).json({
            error:"server error"
        });
    }
};

exports.checkotp = async(req,res)=>{
try{
    const {email,otp}=req.body;
    const isexist = await gym.findOne({
        email,
        resetpasswordtoken: parseInt(otp),
        resetpasswordexpires: {$gt: Date.now()}
    });
    if(!isexist){
        return res.status(404).send({error: 'otp is invalid or has expired'});
    }
    res.status(200).json({message:'otp is valid'});
}catch(err){
    res.status(500).json({
        error:"server error"
    });
}
};

exports.resetpassword = async(req,res)=>{
    try{
        const {email,newpassword} = req.body;
        const isexist = await gym.findOne({email});
        if(!isexist){
            return res.status(400).json({error: 'some technical issues,please try again'});
        }
        const hashedpassword = await bcrypt.hash(newpassword, 10);
        isexist.password=hashedpassword;
        isexist.resetpasswordtoken= undefined;
        isexist.resetpasswordexpires= undefined;
        await isexist.save();
        res.status(200).json({message:'password reset successfully'});
    }catch(err){
        res.status(500).json({
            error:"server error"
        });
    }
};

exports.logout = async(req,res) => {
    res.clearCookie('cookietoken',cookieoptions).json({message:'logout successfully'});
};