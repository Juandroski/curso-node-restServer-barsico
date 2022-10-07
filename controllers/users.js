const { response, request } = require('express');


const usersGet = (req = request, res = response) => { 

    const { name , apellido} = req.query;
    
    res.json({
        msg:'get API - controlador',
        name,
        apellido
    });
  }

const usersPost = (req, res = response) => {
   
    const {nombre, edad} = req.body;

    res.json({
        msg:'post API - controlador',
        nombre,
        edad
    });
}

const usersPut = (req, res = response) => {
    
    const {id} = req.params;

    res.json({
        msg:`put API - controlador params `,
        id 
        
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