const Router = require('express')
const router = new Router()
const {registration, check, login} = require('../controllers/userController')
const authMiddleWare = require('../middleware/authMiddleWare')
const validation = require('../middleware/validation')
router.post('/registration', validation,registration)
router.post('/login', login)
router.get('/auth', authMiddleWare, check)
module.exports =router 