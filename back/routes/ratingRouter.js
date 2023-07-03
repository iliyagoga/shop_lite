const Router = require('express')
const {get,create}= require('../controllers/ratingController')
const authMiddleWare = require('../middleware/authMiddleWare')
const router = new Router()
router.get('/',get)
router.post('/',authMiddleWare,create)
module.exports=router