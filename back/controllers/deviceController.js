const uuid = require('uuid')
const path= require('path')
const { Device, DeviceInfo } = require('../models/model')
const ApiError = require('../error/ApiError')
const { type } = require('os')
async function create(req,res,next){
    try {
        const {name, price, brandId, typeId, info}= req.body
        const {img}=req.files
        let fileName= uuid.v4()+'.jpg'
        img.mv(path.resolve(__dirname,'..','static', fileName))

        if(info){
            info = JSON.parse(info)
            info.forEach(element => {
                DeviceInfo.create({
                    title: element.title,
                    description:element.description,
                    deviceId: device.id
                })
            });
        }

        const device= await Device.create({name, price, BrandId: brandId, TypeId:  typeId,  img: fileName}) 
        return res.json(device)
    } catch (error) {
        return next(ApiError.badRequest(error.message))
    }
    

}
async function getAll(req,res){
    let {typeId,brandId,limit, page}=req.query
    let devices
    page =page || 1
    limit=  limit || 9
    let offset = page* limit - limit
    if(!brandId && !typeId){
        devices = await Device.findAndCountAll({limit, offset})
    }
    if(brandId && !typeId){
        devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
    }
    if(!brandId && typeId){
        devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
    }
    if(brandId && typeId){
        devices = await Device.findAndCountdAll({where: {brandId, typeId}, limit, offset})
    }
    return res.json(devices)

}
async function getOne(req,res){
    const {id}= req.params
    let device= await Device.findOne(
        {
            where: {id},
            include: [{
                model: DeviceInfo,
                as: 'info'
            }]
        })
    return res.json(device)

}
module.exports = {create, getAll, getOne}