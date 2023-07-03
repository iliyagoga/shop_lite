const Router= require('express')
const router = new Router()
router.get('/')
router.post('/add')
router.post('/delete')
router.post('/redact')
module.exports= router