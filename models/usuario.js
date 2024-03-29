const {Schema, model} = require ('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type:String,
        required: [true, 'El password es obligatorio']
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        emun:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },
});



//con esto evitamos mostrar el password y la version
UsuarioSchema.methods.toJSON = function(){
    const { __v, password, ...user} = this.toObject();
    return user;
}




module.exports= model( 'Usuario',UsuarioSchema );