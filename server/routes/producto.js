const express = require('express')
let {verificaToken,verificacionAdmin_Role}= require('../middlewares/autenticacion')

const {}=require('../middlewares/autenticacion')
const { populate } = require('../models/categoria')
const categoria = require('../models/categoria')

let app = express()

let Producto = require('../models/producto')


app.get('/producto',verificaToken,(req,res)=>{
    //traer todoss los productos y la categoria
    //paginado
    let desde = req.body.desde || 0
    desde = Number(desde)

    let limite = req.query.limite || 0
    limite = Number(limite)

    Producto.find({disponible:true})
    .skip(desde)
    .limit(5)
    .populate('usuario','nombre email')
    .populate('categoria','descripcion')
        .exec((err,productos)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                })
            }

            res.json({
                ok:true,
                productos,
            })
        })

})

app.get('/producto/:id',verificaToken,(req,res)=>{
    //traer todoss los productos y la categoria
    //por id, sin paginacion

    let id = req.params.id

    Producto.findById(id)
        .populate('usuario','nombre email')
        .populate('categoria','descripcion')
        .exec((err,productoDB)=>{
        if(err){
            return par.status(500).json({
                ok:false,
                err
            })
        }
        
        if (!productoDB) {
            return res.status(400).json({
                ok:false,
                err:{
                    message:'El ID no es valido'
                }
            })
        } 
        
        res.json({
            ok:true,
            producto:productoDB
        })
    })

})

//buscar productos
app.get('/producto/buscar/:termino',verificaToken,(req,res)=>{

    let termino = req.params.termino

    let regex = new RegExp(termino, 'i')

    Producto.find({nombre:regex})
        .populate('categoria','nombre')
        .exec((err,productos)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                })
            }

            res.json({
                ok:true,
                productos
            })
        })

})


app.post('/producto',verificaToken,(req,res)=>{
    let body = req.body

    let producto = new Producto({
        nombre:body.nombre,
        precioUni:body.precioUni,
        descripcion:body.descripcion,
        disponible:body.disponible,
        categoria:body.categoria,
        usuario:req.usuario._id
    })

    producto.save((err,productoDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.status(201).json({
            ok:true,
            producto: productoDB
        })

    })

})

app.put('/producto/:id',verificaToken,(req,res)=>{
 let id= req.params.id
 let body = req.body

    Producto.findById(id,(err,productoDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })

        }
        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }
      
        
        productoDB.nombre = body.nombre
        productoDB.precioUni = body.precioUni
        productoDB.categoria = body.categoria
        productoDB.disponible = body.disponible
        productoDB.descripcion = body.descripcion

        productoDB.save((err,productoGuardado)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                })
            }

            res.json({
                ok:true,
                producto: productoGuardado
            })
                
        })

    })

})

app.delete('/producto/:id',(req,res)=>{

    let id = req.params.id

    Producto.findById(id,(err,productoDB)=>{
        if(err){
            return par.status(500).json({
                ok:false,
                err
            })
        }
        
        if (!productoDB) {
            return res.status(400).json({
                ok:false,
                err:{
                    message:'El ID no existe'
                }
            })
        } 

        productoDB.disponible=false;

        productoDB.save((err,productoB)=>{
            if(err){
                return par.status(500).json({
                    ok:false,
                    err
                })
            }

            res.json({
                ok:true,
                producto:productoB,
                message:`Producto ${productoDB.nombre} borrado`
            })
        })

    })

})
module.exports = app;