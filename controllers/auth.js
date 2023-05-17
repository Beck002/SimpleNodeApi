const { response } = require('express'); 
const Usuario  = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJwt } = require('../helpers/generarJwt');
const loginUser = async ( req, res = response)=>{

    const { correo, password }= req.body;
    try {
        // valida si el email existe
        const usuario = await Usuario.findOne({correo})
        if( !usuario ){
            return res.status(400).json({
                ok: false,
                errorMessage: 'Correo - Password no son correctos - correo'
            })
        }

        // validar si el usuario esta activo
        if( !usuario.estado ){
            return res.status(400).json({
                ok: false,
                errorMessage: 'Usuario - Password no son correctos - estado: false'
            })
        }

        // validar password

        const validPassword = bcryptjs.compareSync( password, usuario.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                errorMessage: 'Usuario - Password no son correctos - password'
            })
        }; 

        // Generar JWT  

        const token = await generarJwt( usuario.id );

        res.status(200).json({
            usuario,
            token
        })
        
    } catch (error) {
        throw new Error('Error al intentar iniciar sesion')        
    }
}

module.exports = {
    loginUser
}
