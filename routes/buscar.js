const { Router } = require('express');
const { check }  = require('express-validator');
const { buscar, buscar2 } = require('../controllers/buscar');


const router = Router(); 


router.get('/:coleccion/:termino', buscar2)

module.exports = router; 
