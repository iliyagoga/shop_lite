const ApiError = require("../error/ApiError")
const { Rating } = require("../models/model")
const jwt = require('jsonwebtoken')
const {Op}= require('sequelize')
async function get(req,res,next){
    const deviceId=req.query.deviceId ||null
    console.log(deviceId)
    let ratings=[];
    if(deviceId!=null){
        ratings= await Rating.findAll({where:{DeviceId: deviceId}})
    }
    else{
        ratings= await Rating.findAll()
    }
    if(ratings.length==0){
        return next(ApiError.badRequest('Ничего не найдено'))
    }
    
    let t= ratings.sort((a,b)=>{return a.DeviceId-b.DeviceId})
    return res.json(t)
}
async function create(req,res){
    const {DeviceId,rate} =req.body
    const UserId=req.user.id
    const check = await Rating.findOne({where: {UserId,DeviceId}})
    if(!check){
        const rating =  await Rating.create({rate,UserId,DeviceId})
        return res.json(rating)
    }
    return res.json(ApiError.badRequest('Пользователь уже поставил оценку данному товару'))
    }
module.exports={get,create} 