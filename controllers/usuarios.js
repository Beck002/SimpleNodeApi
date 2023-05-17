const { response } = require('express'); 
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const getUsuarios = async ( req , res = response )=>{
    try {
        
        const { desde = 0 , limite = 5 } = req.body; 
        const query = { estado: true }; 

        const [ total, usuarios ] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find( query )
                .skip( Number( desde ))
                .limit( Number( limite ))
        ])

        res.status( 200 ).json({
            total,
            usuarios
        })

    } catch (error) {
        
    }
}

const crearUsuario = async ( req , res = response )=>{

    try {

        const { nombre, correo, password, rol }= req.body;
        const usuario =  new Usuario({ nombre, correo, password, rol });

        // Encriptar contraseñas 
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt ); 

        // Guardar en Db 
        await usuario.save(); 
        res.status(200).json({
            usuario
        });

    } catch (error) {
        res.json(400).json({
            ok: false, 
            errorMessage: "Error al intentar crear usuario"
        });
    }
}

const updateUsuario = async ( req  , res = response )=>{

    try {
     
                
        const { id } = req.params;
        // const { _id, password, google, correo, ...rest } = req.body; 

        // if( password ){
        //     // Encriptar password
        //     const salt = bcryptjs.genSaltSync(); 
        //     rest.password = bcryptjs.hashSync( password, salt); 
        // }

        // const usuario = await Usuario.findByIdAndUpdate( id, rest );
        
        res.status( 200 ).json({
            id
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            errorMessage: "Error al intentar actualizar los datos"
        })
    }

}
const borrarUsuario = async ( req , res = response )=>{

    try {

        const { id } = req.params; 
        
        // "borrar usuario"
        const usuario = await Usuario.findByIdAndUpdate( id, { estado: false});

        res.status(200).json(usuario)

    } catch (error) {
        res.status(400).json({
            ok: false,
            errorMessage: "Error al intentar Borrar"
        })
    }


}


module.exports = {
    crearUsuario, 
    borrarUsuario,
    updateUsuario,
    getUsuarios
}