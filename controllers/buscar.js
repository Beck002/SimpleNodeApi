const { response } = require("express");
const { ObjectId } = require("mongoose").Types; 
const { Categoria, Producto, Usuario, Rol } = require("../models");
const coleccionesPermitidas = [
    'usuarios',
    'rols',
    'productos',
    'categorias'
]; 

const buscarUsuario = async( termino = "", res = response )=>{
    const esMongoId = ObjectId.isValid( termino ); 

    if ( esMongoId ) {
        const usuario = await Usuario.findById(termino); 
        return res.status(200).json({
            results: ( usuario ) ? [ usuario ] : []  
        })
    };

    const regex = new RegExp( termino, 'i');

    const usuarios = await Usuario.find({ 
        $or: [{ nombre: regex},{ correo: regex}],
        $and: [{ estado: true}]
    });

    res.status(200).json({ results: usuarios });
}; 


const buscarRol = async( termino = "", res = response )=>{

    const esMongoId = ObjectId.isValid( termino ); 

    if ( esMongoId ) {
        const rol = await Rol.findById(termino); 
        return res.status(200).json({
            results: ( rol ) ? [ rol ] : []  
        })
    }

    const regex = new RegExp( termino, 'i')

    const rol = await Rol.find({ rol: regex });

    res.status(200).json({ results: rol })


}

const buscarProducto = async( termino = "", res = response )=>{

    const esMongoId = ObjectId.isValid( termino ); 

    if ( esMongoId ) {
        const producto = await Producto.findById(termino).populate('categoria','nombre'); 
        return res.status(200).json({
            results: ( producto ) ? [ producto ] : []  
        })
    }

    const regex = new RegExp( termino, 'i')

    const producto = await Producto.find({ nombre: regex })
                                    .populate('categoria', 'nombre');

    res.status(200).json({ results: producto })


}

const buscarCategoria = async( termino = "", res = response )=>{

    const esMongoId = ObjectId.isValid( termino ); 

    if ( esMongoId ) {
        const categoria = await Categoria.findById(termino); 
        return res.status(200).json({
            results: ( categoria ) ? [ categoria ] : []  
        })
    }

    const regex = new RegExp( termino, 'i')

    const categoria = await Categoria.find({ nombre: regex });

    res.status(200).json({ results: categoria })


}


const buscar = async ( req, res = response)=>{

    const { coleccion, termino } = req.params; 
    const categoria = coleccion.toUpperCase();
    const producto  = termino.toUpperCase(); 
    const categoriaDB = await Categoria.findOne({nombre: coleccion.toUpperCase()}); 
    const productoDB = await Producto.findOne({nombre: producto.toUpperCase()}); 

    if( !categoriaDB ){
        return res.status(400).json({
            ok: false,
            errorMessage: `La categoria: ${categoria} no existe`
        })
    }
    if( !productoDB ){
        return res.status(400).json({
            ok: false,
            errorMessage: `La categoria: ${producto} no existe`
        })
    }

    res.json({ categoriaDB, productoDB });


}

const buscar2 = async (req, res = response)=>{

    const { coleccion, termino } = req.params; 

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            ok: false, 
            errorMessage: `Las colecciones permitidas son: ${coleccionesPermitidas}` 
        })
    };


    switch (coleccion) {
        case 'usuarios':

            buscarUsuario( termino, res)

            break;
        case 'rols':
            buscarRol( termino, res)
                
            break;

        case 'productos':
            buscarProducto( termino, res)

            break;

        case 'categorias':
            buscarCategoria( termino, res)
            
            break;
    
    
        default:
            break;
    }

}


module.exports = {
    buscar,
    buscar2
}