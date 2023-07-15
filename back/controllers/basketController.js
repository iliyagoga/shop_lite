const { Basket, BasketDevice } = require("../models/model")
const Op = require('sequelize')

async function get(req,res){
    const UserId=req.user.id
    const BasketId= await Basket.findOne({where: {UserId}})
    const basketDevices = await BasketDevice.findAll({where:{ BasketId: BasketId.id }})
    return res.json(basketDevices.map((i)=>{return i.DeviceId}))
}
async function add(req,res){
    const {DeviceId}=req.body
    const UserId=req.user.id
    const BasketId= await Basket.findOne({where: {UserId}})
    const basket = await BasketDevice.create({BasketId: BasketId.id,DeviceId})
    return res.json(basket)
}
async function remove(req,res){
    const {DeviceId}=req.body
    const UserId=req.user.id
    const BasketId= await Basket.findOne({where: {UserId}})
    const basket = await BasketDevice.destroy({where: {DeviceId, BasketId: BasketId.id}})
    return res.json(basket)

}
module.exports={get,add,remove}