const { Router } = require('express');

// importamos midleware check para validar  usuario
const { check } = require('express-validator');

//importamos midle wares personalizado que valida campos requeridos obligatoriamente
const { validarCampos } = require('../middlewares/validar-campos');

//importamos helper que valida  elrol y otras cosa mas
const { esRoleValido, existeEmail, existeUsuarioConEseId } = require('../helpers/db-validator');

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuariosControlador');

const router = Router();

router.get('/', usuariosGet);

// REGISTRAR USUARIO
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('correo', 'No es un formato de correo valido').isEmail(),
    // check('rol', 'Rol no valido').isIn(['ADMIN_ROLE', 'ADMIN_USER']),

    check('correo').custom(existeEmail),
    //  VALIDAR QUE EL ROL INGRESADO SI ESTÉ EN LA BASE DE DATOS
    check('rol').custom(esRoleValido),

    /*Despues de todos los check el ultimo midle ware que se debe ejecutar es balidar campos
    que es el que va acomprovar quetodo está ok y se pasaron los filtros bien */
    validarCampos
], usuariosPost);

// ACTUALIZAR USUARIO
router.put('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeUsuarioConEseId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);



module.exports = router;