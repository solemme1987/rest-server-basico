const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = "No Name", apikey } = req.query;
    res.json({
        msg: "GET API - CONTROLADOR",
        q,
        nombre,
        apikey
    });
};

// POS PARA EL USUARIO EN LA API
const usuariosPost = (req, res = response) => {
    const { nombre, telefono } = req.body;
    res.json({
        msg: "POST API - CONTROLADOR",
        nombre,
        telefono
    });
};

// PUT PARA EL USUARIO EN LA API
const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: "PUT API - CONTROLADOR",
        id
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