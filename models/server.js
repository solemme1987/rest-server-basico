const express = require('express');

const cors = require('cors');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // MIDLEWARES
        this.midlewares();

        // RUTAS DE MI APP
        this.routes();
    }

    midlewares() {
        //CORS
        this.app.use(cors());
        //Establezco com ruta raiz el directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        // ejecuto un midleware para tomar las rutas rest del archivo  user.js}
        //cuando la url sea en este caso http://localhost:8080/api/usuarios que
        // me  ejcute  lo que hay en el archivo user.js  ya sea put, get, post, etc...
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Mi aplicacion está corriendo en el puero', this.port);
        });
    }

}

module.exports = Server;