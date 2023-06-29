
const validarCampos  = require('../middleware/validarCampos');
const validarJwt  = require('../middleware/validarJwt');
const validarRoles = require('../middleware/validarRoles');
const validarArchivo = require('../middleware/validarArchivo')

module.exports = {
    ...validarCampos,
    ...validarJwt,
    ...validarRoles,
    ...validarArchivo
}