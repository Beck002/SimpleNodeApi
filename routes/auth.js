const { Router } = require('express');
const { check }  = require('express-validator');
const { loginUser, loginWithGoogle} = require("../controllers/auth");
const { validarCampos } = require('../middleware/validarCampos');

const router = Router(); 

router.post('/login',
    [
        check('correo', 'El correo es obligatorio').isEmail(), 
        check('password', 'El password es obligatorio').not().isEmpty(),         
        validarCampos
    ], 
loginUser); 

router.post('/loginGoogle',
    [
        check('id_token', 'id_token necesario').not().isEmpty(),
        validarCampos
    ],
    loginWithGoogle
)


module.exports = router; 