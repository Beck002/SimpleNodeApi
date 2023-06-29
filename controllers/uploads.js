const { response } = require('express'); 
const cloudinary   = require('cloudinary').v2; 
cloudinary.config(process.env.CLOUDINARY_URL)
const { subirArchivo } = require('../helpers');
const  path  = require('path')
const  fs  = require('fs')
const { Usuario, Producto } = require('../models')

const cargarArchivo = async ( req, res = response)=>{

    try {
        
        // Imagenes
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
    
        res.json({
            nombre
        })
    } catch (error) {
        res.status(400).json({
            errorMessage: error
        })        
    }

}

const actualizarArchivo = async ( req, res = response )=>{

    try {

        const { id, coleccion } = req.params;
        let modelo; 

        switch ( coleccion ) {
            case 'usuarios':  
                modelo = await Usuario.findById(id);
                if( !modelo ){
                    return res.status(400).json({
                        errorMessage: `No existe un usuario con el id ${id}`
                    });
                }
            break;
            case 'productos':  
                modelo = await Producto.findById(id);
                if( !modelo ){
                    return res.status(400).json({
                        errorMessage: `No existe un usuario con el id ${id}`
                    });
                }
            break;
        
            default:
                return res.status(500).json({ errorMessage: 'Se me olvido validar esto' });
                break;
        }


        // Limpiar Imagenes Previas 
        
        if(modelo.img){
            // Borrar la imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)

            if(fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen)
            }
        }

        const nombre = await subirArchivo( req.files, undefined, coleccion );
        modelo.img   = nombre; 
        
        await modelo.save();

        res.json(modelo)
    } catch (error) {
        res.status(400).json({
            error
        })        
    }


}

const mostrarImagen = async ( req, res = response)=>{

    const { coleccion, id }  = req.params;

    let modelo; 

    switch ( coleccion ) {
        case 'usuarios':  
            modelo = await Usuario.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    errorMessage: `No existe un usuario con el id ${id}`
                });
            }
        break;
        case 'productos':  
            modelo = await Producto.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    errorMessage: `No existe un usuario con el id ${id}`
                });
            }
        break;
    
        default:
            return res.status(500).json({ errorMessage: 'Se me olvido validar esto' });
            break;
    }


    // Limpiar Imagenes Previas 
    
    if(modelo.img){
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)

        if(fs.existsSync(pathImagen)){
            return res.sendFile( pathImagen ); 
        };
    }


    const pathName = path.join( __dirname, '../assets/no-image.jpg')

    res.sendFile(pathName)

}


const actualizarImagenCloudinary = async ( req, res = response )=>{

    try {

        const { id, coleccion } = req.params;
        let modelo; 

        switch ( coleccion ) {
            case 'usuarios':  
                modelo = await Usuario.findById(id);
                if( !modelo ){
                    return res.status(400).json({
                        errorMessage: `No existe un usuario con el id ${id}`
                    });
                }
            break;
            case 'productos':  
                modelo = await Producto.findById(id);
                if( !modelo ){
                    return res.status(400).json({
                        errorMessage: `No existe un usuario con el id ${id}`
                    });
                }
            break;
        
            default:
                return res.status(500).json({ errorMessage: 'Se me olvido validar esto' });
                break;
        }


        // Limpiar Imagenes Previas 
        
        if(modelo.img){
            // Eliminacion de cloudinary
            const nombreArr = modelo.img.split('/');
            const nombre    = nombreArr[ nombreArr.length - 1]; 
            const [ public_id ]  = nombre.split('.');
            cloudinary.uploader.destroy( public_id )
        }
        
        const { tempFilePath } = req.files.archivo; 
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
        
        modelo.img   = secure_url;         
        await modelo.save();
        
        res.json(secure_url)
    } catch (error) {
        res.status(400).json({
            error
        })        
    }


}

module.exports = {
    cargarArchivo,
    actualizarArchivo,
    mostrarImagen,
    actualizarImagenCloudinary
}