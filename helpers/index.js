const dbValidators  = require('./dbValidations');
const generarJwt    = require('./generarJwt');
const googleVerify  = require('./googleVerify');
const subirArchivo  = require('./subir-Archivo');

module.exports = {
    ...dbValidators,
    ...generarJwt,
    ...googleVerify,
    ...subirArchivo,
}