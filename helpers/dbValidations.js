const Rol = require("../models/rol"); 
const Usuario = require("../models/usuario");

const rolExiste =  async ( rol = '' )=>{
    const existe = await Rol.findOne({rol}); 
    if(!existe){
        throw new Error(`El rol: ${rol} no existe`);
    }
}

const correoExiste = async( correo = '' ) =>{
    const existe = await Usuario.findOne({correo}); 
    if( existe ){
        throw new Error(`El correo ${ correo} ya se encuentra registrado`)
    }
}

const existeUsuarioPorId = async ( id = '')=>{
    const existe = await Usuario.findById(id);
    if(!existe){
        throw new Error(`El id: ${id} es invalido`)
    }
}

module.exports = {
    correoExiste,
    rolExiste,
    existeUsuarioPorId,
}