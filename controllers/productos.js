const { response } = require('express'); 
const { Producto } = require('../models'); 
const getProductos = async ( req, res = response )=>{
    try {
        const { limite = 5, desde = 0 } = req.body; 
        const query = { estado: true };
        // Traer todas las categorias
        const [ total, productos ] = await Promise.all([
            Producto.countDocuments(query), // contar docuemntos
            Producto.find(query)   // trae los que su estado sea true
                .skip(  Number( desde ))// paginado
                .limit( Number( limite))// paginado
        ]);
        
        res.status(200).json({
            total,
            productos
        });
    
    } catch (error) {
        
        res.status(400).json({
            ok: false, 
            errorMessage: 'No se pudo acceder a los productos',
        });
    }

}

const getProductoById = async ( req, res = response )=>{

    try {
        const { id } = req.params; 
        const producto = await Producto.findById( id );
        res.status(200).json(producto)
    } catch (error) {
        res.status(400).json({
            ok:false,
            errorMessage: 'No se pudo acceder a la informacion solicitada'
        })
    }

}
const borrarProductoById = async ( req, res = response )=>{


    try {
        const { id } = req.params; 
        const data = { estado: false }

        // Borrar categoria: cambiar estado a false
        const producto = await Producto.findByIdAndUpdate( id,data );
        
        res.status(200).json(producto);

    } catch (error) {
        res.status(400).json({
            ok:false,
            errorMessage: 'No se pudo borrar la Producto seleccionada'
        });
        
    };
}
const actualizarProductoById = async ( req, res = response )=>{

    try {
        // id para busqueda, { nombre, usuario } para actuazalizar
        const { id } = req.params; 
        
        const nombre = req.body.nombre.toUpperCase();
        const data = {
            nombre,
            categoria: req.body.categoria
        }

        // Actualiza categoria
        const productoActualizado = await Producto.findByIdAndUpdate(id, data)
        
        res.status(200).json(productoActualizado)

    } catch (error) {
        res.status(400).json({
            ok:false,
            errorMessage: 'No se pudieron actualizar los datos',
        });
    }
}

const crearProducto = async ( req, res = response )=>{

    try {
        const { usuario, estado, ...body } = req.body; 
        const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });    
        if( productoDB ){
            return res.status(400).json({
                ok: false,
                errorMessage: `El producto: ${productoDB.nombre} ya existe`
            });
        };
        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario.uid
        };
        // Crear Producto
        const producto = new Producto( data ); 
        // Guardar Producto
        producto.save();
        res.status(200).json(producto);

    } catch (error) {
        res.status(401).json({
            ok:false,
            errorMessage: 'No se pudo crear el producto',
        });
        
    }

}   


module.exports = {
    getProductos,
    getProductoById,
    actualizarProductoById,
    borrarProductoById,
    crearProducto
}