const uuid = require('uuid')
const path= require('path')
const { Device, DeviceInfo, Brand } = require('../models/model')
const ApiError = require('../error/ApiError')
const { type } = require('os')
async function create(req,res,next){
    try {
        const {name, price, brandId, typeId, info}= req.body
        const {img}=req.files
        let fileName= uuid.v4()+'.jpg'
        img.mv(path.resolve(__dirname,'..','static', fileName))
        const device= await Device.create({name, price, BrandId: brandId, TypeId:  typeId,  img: fileName}) 
        if(info){
            let info2 = JSON.parse(info)
            info2.forEach(element => {

                DeviceInfo.create({
                    title: element.title,
                    description:element.description,
                    DeviceId: device.id
                })
            });
        }
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
        devices = await Device.findAndCountAll({limit, offset,include: [{
            model: Brand}]})
    }
    if(brandId && !typeId){
        devices = await Device.findAndCountAll({where: {BrandId: brandId}, limit, offset,include: [{
            model: Brand}]})
    }
    if(!brandId && typeId){
        devices = await Device.findAndCountAll({where: {TypeId: typeId}, limit, offset,include: [{
            model: Brand}]})
    }
    if(brandId && typeId){
        devices = await Device.findAndCountAll({where: {BrandId: brandId, TypeId: typeId}, limit, offset,include: [{
            model: Brand}]})
    }
    return res.json(devices)

}
async function getOne(req,res){
    const {id}= req.params
    let device= await Device.findOne(
        {
            where: {id},
            include: [
                {model: DeviceInfo,
                as: 'info'}
            ]
        })
    return res.json(device)

}
module.exports = {create, getAll, getOne}