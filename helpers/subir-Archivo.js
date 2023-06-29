const { v4: uuidv4 } = require('uuid');
const path = require('path');



const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '')=>{

    return new Promise( ( resolve, reject)=>{


        const { archivo } = files;

        const nombreCortado = archivo.name.split('.')
        const extension     = nombreCortado[ nombreCortado.length - 1]
    
        // Validar extencion 
        if( !extensionesValidas.includes(extension)){
            return reject( `Solo son validos archivos de tipo: ${extensionesValidas}`)
        }
    
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta , nombreTemp );
      
        archivo.mv(uploadPath, function(err) {
          if (err) {
            reject(err)
          }
          resolve( nombreTemp );
        });

    })

}


module.exports = {
  subirArchivo
}
