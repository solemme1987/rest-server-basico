const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

/*Importamos el modelo para poder hacer el insert en nuestra coleccion
Es necsario mas no obligacion que coloquemos la importacion de sta constante
en mayuscula inicial para que javascript nos permita hacer instancias del modelo
como si fuerauna clase, el estandar */
const UsuariosModelo = require('../models/usuariosModelo');


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = "No Name", apikey } = req.query;
    res.json({
        msg: "GET API - CONTROLADOR",
        q,
        nombre,
        apikey
    });
};

// REGISTRA EL USUARIO EN LA API
const usuariosPost = async(req, res = response) => {

    // /$#Mostramos los errores si el emeail ingresado no es correcto

    const { nombre, correo, password, rol } = req.body;

    const usuario = new UsuariosModelo({ nombre, correo, password, rol });

    //VERIFICAR SI EL CORREO EXISTE
    //Encriptar la  contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en la db
    await usuario.save();

    res.json({
        usuario
    });
};

// ACTUALIZAR EL USARIO
const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        //Encriptar la  contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await UsuariosModelo.findByIdAndUpdate(id, resto);
    res.json({
        msg: "PUT API - CONTROLADOR",
        usuario
    });
};

// DEÑETE ÁRA EL USUARIO EN LA API
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "DELET API - CONTROLADOR"
    });
};

// PATCH PAR EL USUARIO EN LA API
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "PATCH API - CONTROLADOR"
    });
};

//exporto todas las funciones
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
};