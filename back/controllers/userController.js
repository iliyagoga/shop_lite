const ApiError= require('../error/ApiError')
const bcript = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/model')
async function registration(req,res,next){
    console.log(req)
    const {email,password}= req.body
    if(!email || !password){
        return next(ApiError.badRequest('Некорректный логин или пароль'))
    }
    const candidate = await User.findOne({where: {email}})
    if(candidate){
        return next(ApiError.badRequest('Такой пользователь уже существует'))
    }
    const  hashPassword= await bcript.hash(password,5)
    const user= User.create({email: email, password: hashPassword})
    const basket= Basket.create({userId: user.id})
    const token= jwt.sign({id: user.id, email: user.email, role: user.role},process.env.SECRET_KEY, {expiresIn:'24h'})
    return res.json(token)
}
async function login(req,res,next){
    const {email,password}=req.body
    if(!email || !password){
        return next(ApiError.badRequest('Некорректный логин или пароль'))
    }
    const candidate= await User.findOne({where: {email}})
    if(!candidate){
        return next(ApiError.badRequest('Такого пользователя нет'))
    }
    if(candidate){
        const compare= await bcript.compare(password, candidate.password)
        if(compare)
        return res.json(jwt.sign({id: candidate.id, email, role: candidate.role},process.env.SECRET_KEY, {expiresIn:'24h'}))
        else
        return next(ApiError.badRequest('Неправильный логин или пароль'))
    }



}
async function check(req,res,next){

    return res.json(jwt.sign({id: req.user.id, email, role: req.user.role},process.env.SECRET_KEY, {expiresIn:'24h'}))
}
module.exports = {registration, login, check}