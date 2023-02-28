const { Router } = require('express');
const {check} = require('express-validator');


const {validarCampos} = require('../middlewares/validar-campos')
const {esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const { usersGet,
        usersPost,
        usersPut,
        usersDelete,
       } = require('../controllers/users');

const router = Router();


  router.get('/',usersGet);

  router.put('/:id',[
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
  ], usersPut);
  
  router.post('/',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password','el password debe contener mas de 6 letras').isLength({min:6}),
    check('correo','el correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
  ],usersPost);
  
  router.delete('/',usersDelete); 


module.exports = router;

