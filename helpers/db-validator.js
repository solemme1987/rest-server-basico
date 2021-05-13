const RolModelo = require('../models/rolModelo');
const UsuariosModelo = require('../models/usuariosModelo');

// VALIDAR QUE EL ROL SELECCIONADO SE ENCUENTRE REGISTRADO EN LA BD
const esRoleValido = async(rol = '') => {
    const existeRol = await RolModelo.findOne({ rol });
    if (!existeRol) {
        throw new Error('El rol ingresado no se encuentra en la BD');
    }
};

// VALIDAR QUE NO SE REPITA CORREO ELCTRONICO
const existeEmail = async(correo = '') => {
    const existeEmail = await UsuariosModelo.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya ha sido registrado en la bd`);
    }
};

// VALIDAR QUE El usuario con ese id si exista
const existeUsuarioConEseId = async(id = '') => {
    const existeUsuario = await UsuariosModelo.findById(id);
    if (!existeUsuario) {
        throw new Error(`No Existe un usuario Registrado con el  id: ${id}`);
    }
};

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioConEseId
};