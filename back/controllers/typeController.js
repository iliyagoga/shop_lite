const  {Type}= require('../models/model')
const ApiError = require('../error/ApiError')
const { modelManager } = require('../db')
async function create(req,res){
    const {name}= req.body
    const type = await Type.create({name})
    return res.json(type)

}
async function getAll(req,res){
    const types = await Type.findAll()
    return res.json(types)
    

}
module.exports = {create, getAll}