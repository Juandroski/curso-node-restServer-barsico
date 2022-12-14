const express = require('express');
const cors = require('cors');


class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use(cors())

        //lectura y parser
        this.app.use(express.json());

        //Directorio Publico
        this.app.use( express.static('public'));
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