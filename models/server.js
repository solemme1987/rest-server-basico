const express = require('express');

const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // CONNECTAR LA BASE DE DATOS
        this.connectDb();

        // MIDLEWARES
        this.midlewares();


        // RUTAS DE MI APP
        this.routes();
    }

    midlewares() {

        //CORS
        this.app.use(cors());

        // LEctura y parseo del Body
        //Esto hace que todo lo que ingrse al servidor por http
        // intene parszearlo o convertirlo a formato json
        this.app.use(express.json());
        //Establece com ruta raiz el directorio público y vbusca el inex.html como primera opcion arenderizar
        this.app.use(express.static('public'));
    }

    async connectDb() {
        await dbConnection();
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