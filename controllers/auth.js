const { response } = require('express'); 
const Usuario  = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJwt } = require('../helpers/generarJwt');
const { googleVerify } = require('../helpers/googleVerify');

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

const loginWithGoogle = async ( req, res )=>{

    const { id_token } = req.body; 
    try {

        const { name:nombre, email:correo, picture:img }= await googleVerify( id_token );
        let usuario = await Usuario.findOne({ correo }); 
        
        if( !usuario ){
            // Crear usuario 

            const data = {
                nombre: name,
                correo: email,
                password: ':x',
                img: picture,
                google: true,
                rol: 'USER_ROL'
            }

            usuario = new Usuario( data );

            await usuario.save();
        }



        // Si el usuario en base de datos 
        if(!usuario.estado){
            return res.status(401).json({
                errorMessage: 'Hable con el administrador, usuario bloqueado'
            })
        }

        // Generar JWT

        const token = await generarJwt( usuario.uid);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.json({
            errorMessage: "Token de google invalido",
        })
    }


}

module.exports = {
    loginUser,
    loginWithGoogle
}
