const { response } = require('express'); 
const { Categoria } = require('../models');

const getCategorias = async ( req, res = response )=>{
    try {
        const { limite = 5, desde = 0} = req.body; 
        const query = { estado: true };
        // Traer todas las categorias
        const [ total, categorias ] = await Promise.all([
            Categoria.countDocuments(query), // contar docuemntos
            Categoria.find(query)   // trae los que su estado sea true
                // .populate( 'usuario', 'nombre')
                .skip(  Number( desde ))// paginado
                .limit( Number( limite))// paginado
        ]);
        
        res.status(200).json({
            total,
            categorias
        });
    
    } catch (error) {
        
        res.status(400).json({
            ok: false, 
            errorMessage: 'No se pudo acceder a las categorias',
            error
        });
    }

}

const getCategoriaById = async ( req, res = response )=>{

    try {
        const { id } = req.params; 
        const categoria = await Categoria.findById( id );
        res.status(200).json(categoria)
    } catch (error) {
        res.status(400).json({
            ok:false,
            errorMessage: 'No se pudo acceder a la informacion solicitada',
            error
        })
    }

}
const borrarCategoriaById = async ( req, res = response )=>{


    try {
        const { id } = req.params; 
        const data = { estado: false }

        // Borrar categoria: cambiar estado a false
        const categoria = await Categoria.findByIdAndUpdate( id,data );
        
        res.status(200).json(categoria);

    } catch (error) {
        res.status(400).json({
            ok:false,
            errorMessage: 'No se pudo borrar la categoria seleccionada',
            error
        });
        
    };
}
const actualizarCategoriaById = async ( req, res = response )=>{

    try {
        // id para busqueda, { nombre, usuario } para actuazalizar
        const { id } = req.params; 
        
        const nombre = req.body.nombre.toUpperCase();
        const data = {
            nombre,
            usuario: req.body.usuario
        }

        // Actualiza categoria
        const categoriaActualizada = await Categoria.findByIdAndUpdate(id, data)
        
        res.status(200).json(categoriaActualizada)

    } catch (error) {
        res.status(400).json({
            ok:false,
            errorMessage: 'No se pudieron actualizar los datos',
        });
    }
}

const crearCategoria = async ( req, res = response )=>{

    const nombre = req.body.nombre.toUpperCase(); 

    const categoriaDB = await Categoria.findOne({nombre}); 

    if( categoriaDB ){
        res.status(400).json({
            ok: false, 
            errorMessage: `La categoria : ${categoriaDB} ya existe`
        })
    }

    // Generar la data a guardar 

    const data = {
        nombre, 
        usuario: req.body.usuario.uid
    }
    // crear categoria
    const categoria = new Categoria( data );
    // guardar Categoria  
    await categoria.save(); 

    res.status(201).json(categoria)
}   


module.exports = {
    getCategorias,
    getCategoriaById,
    actualizarCategoriaById,
    borrarCategoriaById,
    crearCategoria
}