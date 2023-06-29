
const validarArchivoSubir = ( req, res, next) => {


    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send({errorMessage: 'No hay archivos que subir - validarArchivoSubir'});
        return;
    }

    next(); 

}

module.exports = {
    validarArchivoSubir
    
}