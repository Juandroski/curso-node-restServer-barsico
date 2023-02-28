const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usersGet = async (req = request, res = response) => { 
    
    const {limit = 5, desde = 0} = req.query;
    const query = { estado: true };

    const usuarios = await Usuario.find(query )
        .skip(desde)
        .limit(limit);

    const total = await Usuario.countDocuments( query );
    
    res.json({
        total,
        usuarios
    });
  }

const usersPost = async (req, res = response) => {


    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

    //verificar si el correo existe


    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    //guardar en DB    
    await usuario.save();

    res.json(usuario);
}

const usersPut = async (req, res = response) => {
    
    const {id} = req.params;
    //destructuramos el body para sacar los datos que no queremos actualizar
    const {_id, password, google, ...resto  } = req.body;

    //TODO validar contra base de datos
    if( password ){
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);

    }

    const usuarioDb = await Usuario.findByIdAndUpdate(id,resto)

    res.json({
        msg:`put API - controlador params `,
        usuarioDb
        
    });
}

const usersDelete = (req, res = response) => {
    
    res.json({
        msg:'delete API - controlador'
    });
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
    
}