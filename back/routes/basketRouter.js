const Router= require('express')
const authMiddleWare= require('../middleware/authMiddleWare')
const router = new Router()
const {get,add,remove}=require('../controllers/basketController')
router.get('/',authMiddleWare,get)
router.post('/add',authMiddleWare,add)
router.post('/remove',authMiddleWare,remove)
module.exports= router