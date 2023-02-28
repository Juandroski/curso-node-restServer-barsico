const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const bodyParser = require('body-parser');


class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Conectar a Base de Datos
        this.conectarDB();
        
        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
       await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors())

        //lectura y parser
        this.app.use(express.json());

        //Directorio Publico
        this.app.use( express.static('public'));

        // Middlewares
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
        this.app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });


    }

    routes(){
        this.app.use(this.usersPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('servidor corriendo por el puerto',this.port);
        });
    }

}

module.exports = Server;