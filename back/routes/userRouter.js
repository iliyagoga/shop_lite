const Router = require('express')
const router = new Router()
const {registration, check, login} = require('../controllers/userController')
const authMiddleWare = require('../middleware/authMiddleWare')
router.post('/registration', registration)
router.post('/login', login)
router.get('/auth', authMiddleWare, check)
module.exports =router 