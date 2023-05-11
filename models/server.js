const express  = require('express'); 
const cors = require('cors');
const { dbConnection } = require('../database/config'); 


class Server {

    constructor(){
        this.app = express(); 
        this.PORT = process.env.PORT; 
        this.usuariosPath = '/api/usuarios';
        // conectar a db 
        this.conectarDb(); 
        // middleware
        this.middlewares();
        // rutas app
        this.routes(); 
    }

    middlewares(){
        // CORS 
        this.app.use( cors()); 
        //Lectura y parseo del body 
        this.app.use( express.json());
        // Directorio Publicos 
        this.app.use( express.static('public'));
    }

    async conectarDb(){
        await dbConnection();
    }

    routes() {
        this.app.use( this.usuariosPath, require("../routes/usuarios"));
    }

    listen(){
        this.app.listen( this.PORT, ()=>{
            console.log(`DB habilitada en puerto: ${this.PORT}`)
        });
    }
}


module.exports = Server; 