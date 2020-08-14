var express = require('express');
var router = express.Router();

// require controller
var santri_controller = require('../controllers/santriController');

router.get('/admin',santri_controller.admin);

// SANTRI ROUTES   
// list all
router.get('/',santri_controller.santri_list);

// detail
router.get('/detail/:id',santri_controller.santri_detail);

// form santri
router.get('/create',santri_controller.santri_form);

// proses add santri
router.post('/create',santri_controller.santri_add);

// update
router.put('/update/:id',santri_controller.santri_update);

// proses delete
router.get('/delete/:id',santri_controller.santri_delete);

// delete
router.delete('/delete/:id',santri_controller.santri_delete);

// upload foto
router.get('/upload/:id',santri_controller.santri_upload);

module.exports = router;