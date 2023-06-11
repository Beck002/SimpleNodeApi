const { Router } = require('express');
const { check }  = require('express-validator');
const { validarCampos } = require('../middleware/validarCampos');
const { validarJwt, esAdminRol } = require('../middleware');
const { crearCategoria, getCategoriaById, getCategorias, borrarCategoriaById, actualizarCategoriaById } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/dbValidations');

const router = Router(); 
// obtener todas las categorias  - publico
router.get('/',
    getCategorias
);

// Obetener categoria por id  - publico
router.get('/:id',
    [   
        check('id', 'Tiene que ser una de id de Mongo').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos
    ],
    getCategoriaById
)

//Crear categoria - privado - cualquier persona con un token valido puede hacerlo
router.post('/',[
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    ],
    crearCategoria
)

// Actualizar un registro por id

router.put('/:id',
    [   
        validarJwt,
        check('id', 'Tiene que ser una de id de Mongo').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos
    ],
    actualizarCategoriaById
)
// Borrar categoria por id 

router.delete('/:id',
    [   
        validarJwt,
        esAdminRol,
        check('id', 'Tiene que ser una de id de Mongo').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos
    ],
    borrarCategoriaById
)



module.exports = router; 



