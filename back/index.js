const express = require('express')
require('dotenv').config()
const sequelize = require('./db')
const cors=require('cors')
const models = require('./models/model')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const filesUpload = require('express-fileupload')
const path= require('path')
const app=express()
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json())
app.use(filesUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)
app.use(errorHandler)

async function start(){
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(process.env.PORT, ()=>{console.log('сервер запущен '+process.env.PORT)})
    } catch (error) {
        console.log(error)
    }


}
start()
// const express = require('express')
// const app =express()
// app.listen(3000)





