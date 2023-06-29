const { Categoria, Producto } = require("../models");
const Rol = require("../models/rol"); 
const Usuario = require("../models/usuario");

const rolExiste =  async ( rol = '' )=>{
    const existeRol = await Rol.findOne({rol}); 
    if(!existeRol){
        throw new Error(`El rol: ${rol} no existe`);
    }
}

const correoExiste = async( correo = '' ) =>{
    const existeCorreo = await Usuario.findOne({correo}); 
    if( existeCorreo ){
        throw new Error(`El correo ${ correo} ya se encuentra registrado`)
    }
}

const existeUsuarioPorId = async ( id = '')=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id: ${id} es invalido`)
    }
}

const existeCategoriaPorId = async ( id = '')=>{
    const existeCategoria = await Categoria.findById(id); 
    if(!existeCategoria){
        throw new Error(`El id: ${id} es invalido`)
    }
}

const existeProductoPorId = async ( id = '')=>{
    const existeProducto = await Producto.findById(id); 
    if(!existeProducto){
        throw new Error(`El id: ${id} es invalido`)
    }
}
const coleccionesPermitidas = async ( coleccion = '', colecciones = [])=>{

    if(!colecciones.includes(coleccion)){
        throw new Error(`La coleccion: ${coleccion} no es valido. colecciones validas: ${colecciones}`)
    }

    return true; 
}

module.exports = {
    correoExiste,
    rolExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}