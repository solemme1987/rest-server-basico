const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // MIDLEWARES
        this.midlewares();

        // RUTAS DE MI APP
        this.routes();
    }

    midlewares() {
        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.send('Hello World');
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Mi aplicacion está corriendo en el puero', this.port);
        });
    }

}

module.exports = Server;