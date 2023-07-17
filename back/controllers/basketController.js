const { Basket, BasketDevice, DeviceInfo, Device, Brand } = require("../models/model")
const {Op} = require('sequelize')

async function get(req,res,next){
    const UserId=req.user.id
    const BasketId= await Basket.findOne({where: {UserId}})
    if(BasketId!=null){
        const basketDevices = await BasketDevice.findAll({where:{ BasketId: BasketId.id }})
        let device= await Device.findAll(
            {
                where: {id:
                 {[Op.and]: [basketDevices.map(i=>{return i.DeviceId})],
                }
                },
                include: [{
                    model: DeviceInfo,
                    as: 'info'
                },{model: Brand}]
            })
        return res.json(device)
        }
    return next()

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