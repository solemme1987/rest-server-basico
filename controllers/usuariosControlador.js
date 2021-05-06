const { response } = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
        msg: "GET API - CONTROLADOR"
    });
};

// POS PARA EL USUARIO EN LA API
const usuariosPost = (req, res = response) => {
    res.json({
        msg: "POST API - CONTROLADOR"
    });
};

// PUT PARA EL USUARIO EN LA API
const usuariosPut = (req, res = response) => {
    res.json({
        msg: "PUT API - CONTROLADOR"
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