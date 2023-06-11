const { Router } = require('express');
const { check }  = require('express-validator');
const { validarCampos } = require('../middleware/validarCampos');
const { validarJwt, esAdminRol } = require('../middleware');
const { getProductos, crearProducto, getProductoById, actualizarProductoById, borrarProductoById } = require('../controllers/productos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/dbValidations');

const router = Router(); 
// obtener todas las categorias  - publico
router.get('/',
    getProductos
);

// Obetener categoria por id  - publico
router.get('/:id',
    [   
        check('id', 'Tiene que ser una de id de Mongo').isMongoId(),
        check('id').custom( existeProductoPorId ),
        validarCampos
    ],
    getProductoById
)

//Crear categoria - privado - cualquier persona con un token valido puede hacerlo
router.post('/',[
        validarJwt,
        esAdminRol,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('categoria', 'Debe ser una id de mongo').isMongoId(),
        check('categoria').custom( existeCategoriaPorId ),
        validarCampos
    ],
    crearProducto
)

// Actualizar un registro por id

router.put('/:id',
    [   
        validarJwt,
        esAdminRol,
        check('categoria', 'Tiene que ser una de id de Mongo').isMongoId(),
        check('id').custom( existeProductoPorId ),
        validarCampos
    ],
    actualizarProductoById
)
// Borrar categoria por id 

router.delete('/:id',
    [   
        validarJwt,
        esAdminRol,
        check('id', 'Tiene que ser una de id de Mongo').isMongoId(),
        check('id').custom(existeProductoPorId),
        validarCampos
    ],
    borrarProductoById
)

module.exports = router; 



