const { request } = require('express');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

const validarJwt = async ( req = request, res, next )=>{

    const token = req.header('x-token'); 

    if(!token){
        return res.status(401).json({
            ok: false,
            errorMessage: 'No hay token en la peticion'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        // validar usuario 
        req.uid = uid;
        const usuario = await Usuario.findById(uid); 
        
        if( !usuario ) {
            return res.status(401).json({
                ok:false,
                errorMessage: 'Token no valido - el usuario no existe en la DB'
            })
        }
        if( !usuario.estado ){
            return res.status(401).json({
                ok:false,
                errorMessage: 'Token no valido - usuario con estado false'
            })
        }
        req.usuario = usuario;
        next();
        
    } catch (error) {
        console.log(error)
        res.status(402).json({
            ok: false,
            errorMessage: 'Token invalido'
        })
    }


}

module.exports = { validarJwt };