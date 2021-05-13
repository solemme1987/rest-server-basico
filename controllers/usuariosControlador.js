const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

/*Importamos el modelo para poder hacer el insert en nuestra coleccion
Es necsario mas no obligacion que coloquemos la importacion de sta constante
en mayuscula inicial para que javascript nos permita hacer instancias del modelo
como si fuerauna clase, el estandar */
const UsuariosModelo = require('../models/usuariosModelo');


// OBTENR USUARIOS DESDE UN REGISTRO ESPECIFICO ES
const usuariosGet = async(req = request, res = response) => {

    const { desde = 0, limit = 5 } = req.query;
    //que solo me muestre los  usuarios que tienen  es estado en true
    const query = { estado: true };

    const [total_usuarios, usuarios] = await Promise.all([
        UsuariosModelo.countDocuments(query),
        UsuariosModelo.find(query)
        .skip(Number(desde))
        .limit(Number(limit))
    ]);

    res.json({
        total_usuarios,
        usuarios
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
const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    // BORRAMOS EL USUARIO FISICAMENTE FORMA NO RECOMENDADA
    // const usuario = await UsuariosModelo.findByIdAndDelete(id);

    // ELIMINAMOS EL USUARIO DE LA FORMA RECOMENDADA CAMBIANDO SU ESTADO A FALSE
    const usuario = await UsuariosModelo.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: "USUARIO ELIMINADO CORRECTAMENTE",
        usuario
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