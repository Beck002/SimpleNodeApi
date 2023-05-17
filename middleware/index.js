
const validarCampos  = require('../middleware/validarCampos');
const validarJwt  = require('../middleware/validarJwt');
const validarRoles = require('../middleware/validarRoles');


module.exports = {
    ...validarCampos,
    ...validarJwt,
    ...validarRoles,
}