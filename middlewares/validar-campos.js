const {validationResult} = require('express-validator');


//el tercer argumento es next para cuando el midelware pasa como el check

const validarCampos = ( req,res, next) =>{

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        console.log('aqui');
        return res.status(400).json(errors);
    }

    next();

}

module.exports={
    validarCampos
}