const jwt =require('jsonwebtoken')
module.exports=function(req,res,next){
    if(req.mothod=== "OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return es.status(401).json('Пользователь не авторизован')
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user =decoded
        next()
        
    } catch (error) {
        return res.status(401).json('Пользователь не авторизован')
    }
}