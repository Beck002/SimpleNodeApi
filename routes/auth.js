const { Router } = require('express');
const { check }  = require('express-validator');
const { loginUser } = require("../controllers/auth");
const { validarCampos } = require('../middleware/validarCampos');

const router = Router(); 

router.post('/login',
    [
        check('correo', 'El correo es obligatorio').isEmail(), 
        check('password', 'El password es obligatorio').not().isEmpty(),         
        validarCampos
    ], 
loginUser); 


module.exports = router; 