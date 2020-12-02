
const express = require('express')

let {verificaToken,verificacionAdmin_Role}= require('../middlewares/autenticacion')

let app = express()

let Categoria = require('../models/categoria')




app.get('/categoria',verificaToken,(req,res)=>{

    //mostrar todas las categorias
    let desde = req.query.desde || 0
    desde = Number(desde)
    let limite = req.query.limite || 0
    limite = Number(limite)


    Categoria.find()
        .sort('descripcion')
        .populate('usuario','nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err,categorias)=>{
            if (err) {
                return err.status(400).json({
                    ok:false,
                    err
                })
            } 

            Categoria.count({estado:true},(err,conteo)=>{
                res.json({
                    ok:true,
                    categorias,
                    registros:conteo
                })
            })
        }) 
})

//mostrar una categoria por id
app.get('/categoria/:id',verificaToken,(req,res)=>{

    let id=req.params.id

    Categoria.findById(id,(err,categoriaDB)=>{
            
            if (err) {
                return res.status(500).json({
                    ok:false,
                    err
                })
            } 

            if (!categoriaDB) {
                return res.status(500).json({
                    ok:false,
                    err:{
                        message:'El ID no es valido'
                    }
                })
            } 

            res.json({
                ok:true,
                categoria:categoriaDB
            })
            
        
    })

})

//crear nueva categoria
app.post('/categoria',verificaToken,(req,res)=>{
    let body= req.body

    let categoria = new Categoria({
        descripcion:body.descripcion,
        usuario:req.usuario._id
    })
    
    categoria.save((err,categoriaDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            categoria: categoriaDB
        })
    })
})

//editar categoria
app.put('/categoria/:id',(req,res)=>{

    let id=req.params.id
    let body=req.body

    let descCategoria = {
        descripcion:body.descripcion
    }

    Categoria.findByIdAndUpdate(id,descCategoria,{new:true,runValidators:true},(err,categoriaDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            categoria: categoriaDB
        })
        
    })
})

//eliminiar categoria
app.delete('/categoria/:id',[verificaToken,verificacionAdmin_Role],(req,res)=>{

    let id = req.params.id;

    Categoria.findByIdAndRemove(id,(err,categoriaDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'el id no existe'
                }
            })
        }
        res.json({
            ok:true,
            message:'Categoria Borrada'
        })


    })
})

module.exports= app;