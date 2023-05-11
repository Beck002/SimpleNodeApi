const { Router } = require('express');
const { check }  = require('express-validator');
const { validarCampos } = require('../middleware/validarCampos');
const { crearUsuario, borrarUsuario,updateUsuario,getUsuarios } = require('../controllers/usuarios');
const { correoExiste, rolExiste, existeUsuarioPorId } = require('../helpers/dbValidations');

const router = Router(); 

router.get('/', getUsuarios )

router.post(
    '/crearUsuario',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo','El correo es obligatorio' ).isEmail(),
        check('password','El passoword debe contener al menos 6 caracteres').isLength({ min: 6}),
        check('correo').custom( correoExiste ),
        check('rol').custom( rolExiste ),
        validarCampos
    ],
crearUsuario ); 

router.put(
    '/:id',
    [
        check('id', 'Es una id invalida').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('rol').custom( rolExiste),
        validarCampos
    ],
updateUsuario ); 

router.delete('/:id',
    [
        check('id', 'No es un Id valido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
    ],
borrarUsuario ); 

module.exports = router; 