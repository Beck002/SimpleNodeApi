const jwt = require('jsonwebtoken')

const generarJwt = ( uid = '' ) => {

    return new Promise(( resolve, reject )=>{

        const payload = { uid }; 

        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '4h'
        }, ( error, token )=>{
            if( error ){
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve( token )
            }
        })
    })
}


module.exports = { generarJwt }; 