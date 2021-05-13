const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña  es obligatorio'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: true
    },

});

// NO QUEERMOS MOSTRAR MAS LA CONTRASEÑA Y EL  __V  CUANDO HACEMOS EL POST PARA GUARDAR

/*"usuario": {
    "estado": true,
    "google": true,
    "_id": "6099e30e0b88f29c491a7bbf",
    "nombre": "text 4",
    "correo": "test5@gmail.com",
    "password": "$2a$10$vbCJX6qDzbKJQvg9KGYxOubIENAPdtkhnAYnnzV1UqhzI85RQYtd6",
    "rol": "ADMIN_ROLE",
    "__v": 0
}*/

// QUERMOS NO SE MUESTRE LA CONTRASEÑA Y EL ULTIMO VALOR ENTONCES VAMOS A SOBRESCRIBIRLO DELA SIGUIENTE MANERA

/*Esto lo que hace es que cuando respondemos a la solicitud me muestra todos los datos
menos la version qudaria algo asi



{
    "usuario": {
        "estado": true,
        "google": true,
        "_id": "6099e5bf9070c9abf9adb22f",
        "nombre": "text 4",
        "correo": "test8@gmail.com",
        "rol": "ADMIN_ROLE"
    }
}

PERO SI ME LOS REGISTRA COMPLETOS A LA BD
*/
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
};


/*de sta forma se exporta  nuestra colecion o tabla
lo hacemos a traves de la funcion model importada desde el incio de
este archivo  a traves de mongoose.
jrecibe 2 parametros :

1. El primero es el nombre que le queremos dar anuestra
   colección debe ser con mayuscual incial
2. y el segundo es el Schema que creamos en este caso
   sería UsuarioSchema

NOTA:
Los nombres de las colecciones los pasamos en singular pero
mongo  por defecto les agrega una "s" al final, asi que
siempre pasar los nombres en Singular y con mayuscula inicial
*/
module.exports = model('Usuario', UsuarioSchema);