const ApiError = require("../error/ApiError")
const { Rating } = require("../models/model")
const jwt = require('jsonwebtoken')
const {Op}= require('sequelize')
async function get(req,res,next){
    const deviceIdes=Object.values(req.query).map((i)=>{return Number(i)})

    let ratings= await Rating.findAll({where: 
        {DeviceId: 
            {[Op.or]: [...deviceIdes],
            }
        }})
    if(ratings.length==0){
        return next(ApiError.badRequest('Ничего не найдено'))
    }
    let t= ratings.sort((a,b)=>{return a.DeviceId-b.DeviceId})
    return res.json(t)
}
async function create(req,res){
    const {DeviceId,rate,UserId} =req.body
    const check = await Rating.findOne({where: {UserId}})
    if(!check){
        const rating =  await Rating.create({rate,UserId,DeviceId})
        return res.json(rating)
    }
    return res.json(ApiError.badRequest('Пользователь уже поставил оценку данному товару'))
    }
module.exports={get,create} 