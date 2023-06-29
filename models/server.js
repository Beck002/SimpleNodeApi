const express  = require('express'); 
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config'); 


class Server {

    constructor(){
        this.app = express(); 
        this.PORT = process.env.PORT; 
        this.paths = {
            usuarios:  '/api/usuarios',
            auth: '/api/auth',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
            upload: '/api/uploads'
        } 
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
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    async conectarDb(){
        await dbConnection();
    }

    routes() {
        this.app.use( this.paths.usuarios ,   require("../routes/usuarios"));
        this.app.use( this.paths.auth ,       require("../routes/auth"));
        this.app.use( this.paths.categorias , require("../routes/categorias"));
        this.app.use( this.paths.productos ,  require("../routes/productos"));
        this.app.use( this.paths.buscar ,     require("../routes/buscar"));
        this.app.use( this.paths.upload ,     require("../routes/uploads"));
    }

    listen(){
        this.app.listen( this.PORT, ()=>{
            console.log(`DB habilitada en puerto: ${this.PORT}`)
        });
    }
}


module.exports = Server; 