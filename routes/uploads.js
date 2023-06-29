const { Router } = require('express');
const { check }  = require('express-validator');
const { cargarArchivo, actualizarArchivo, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { validarCampos, validarArchivoSubir } = require('../middleware');
const { coleccionesPermitidas } = require('../helpers');

const router = Router(); 

router.post('/', validarArchivoSubir , cargarArchivo)

router.put('/:coleccion/:id',
    [
        check('id', 'El id debe ser de Mongo').isMongoId(),
        check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'])), 
        validarCampos,
    ],
    actualizarImagenCloudinary)  
// actualizarArchivo)

router.get(
    '/:coleccion/:id',
    [
        check('id', 'El id debe ser de Mongo').isMongoId(),
        check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'])), 
        validarCampos,
    ],  
    mostrarImagen
)

module.exports = router; 



