const jwt = require('jsonwebtoken')
const { response } = require('../routes/usuario')

/*
==========Verificar Token================
*/
let verificaToken=(req,res,next)=>{
    let token = req.get('token')

    //PARA verificar el token
    jwt.verify(token,process.env.SEED,(err,decoded)=>{
        if (err) {
            return res.status(401).json({
                ok:false,
                err:{
                    message:'token no valido'
                }
            })
        }
        //y si el token se valida entonces
        req.usuario=decoded.usuario
        //next es para continuar las demas funciones y no quedarse en la actual
        next()
    })

}

/*
==========Verificar Admin role================
*/

let verificacionAdmin_Role = (req,res,next)=>{
    let usuario=req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next()
    }    
    else{
        res.json({
            ok:false,
            err:{
                message:'El usuario no es admin'
            }
        })
    }
}

/*
==========Verificar token para imagen================
*/

let verificacionTokenImg = (req,res,next)=>{
    let token = req.query.token;

    jwt.verify(token,process.env.SEED,(err,decoded)=>{
        if (err) {
            return res.status(401).json({
                ok:false,
                err:{
                    message:'token no valido'
                }
            })
        }
        //y si el token se valida entonces
        req.usuario=decoded.usuario
        //next es para continuar las demas funciones y no quedarse en la actual
        next()
    })
}

module.exports = {
    verificaToken,
    verificacionAdmin_Role,
    verificacionTokenImg
}