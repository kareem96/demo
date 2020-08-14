var express = require('express');
var router = express.Router();

// require controller
var users_controller = require('../controllers/usersController');

router.get('/admin',users_controller.admin);

// SANTRI ROUTES   
// list all
router.get('/',users_controller.users_list);

// detail
router.get('/detail/:id',users_controller.users_detail);

// form santri
router.get('/create',users_controller.users_form);

// proses add santri
router.post('/create',users_controller.users_add);

// update
router.put('/update/:id',users_controller.users_update);

// proses delete
router.get('/delete/:id',users_controller.users_delete);

// delete
router.delete('/delete/:id',users_controller.users_delete);

module.exports = router;