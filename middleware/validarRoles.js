const { request } = require('express')

const esAdminRol = ( req = request, res, next ) => {
    
    if(!req.usuario){
        return res.status(500).json({
            ok: false,
            errorMessage: 'Se quiere verificar el token primero'
        })
    };

    const { rol } = req.usuario; 

    if( rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            ok: false, 
            errorMessage: 'No cuenta con los permisos de Administrador'
        })
    }

    next();

}

const tieneRol = ( ...roles )=>{
    return ( req, res , next)=>{

        if(!req.usuario){
            return res.status(500).json({
                ok: false,
                errorMessage: 'Se quiere verificar el token primero'
            })
        };
        
        if( !roles.includes(  req.usuario.rol )){
            return res.status(401).json({
                ok: false,
                errorMessage: `El servicio solo admite los siguientes roles: ${roles}`
            })
        };
        

        next();
    }

}

module.exports = {
    esAdminRol,
    tieneRol
}



