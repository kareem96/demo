//data santri
var express = require('express');
var router = express.Router();
let SantriModel = require('../models/Santri');
let UsersModel = require('../models/Users');
const passport = require('passport');
// json web token
var jwt = require('jsonwebtoken');

/** @swagger
 * tags:
 * name: Santri
 * description: Pengelolaan santri 
*/

/** 
 * @swagger
 * path:
 *  /santri:
 *      get:
 *          summary: Get Link Santri
 *          tags: [santri]
 *          respose:
 *              "200":
 *                  description: List User
 *                  content: appliaction/json
 */

//get (ambl data)
router.get('/santri',async (req,res)=>{
    let data = await SantriModel.santri_list();
    res.jsonp(data);
});

/** 
 * @swagger
 * tags:
 * name: Santri
 * description: Pengelolaan santri
*/

/**
 * @swagger
 * path: 
 *  /santri/:
 *      get:
 *          summary: Get detail santri
 *          tags: [santri]
 *          requestBody:
 *                  required: true
 *                  content: 
 *                      apliication/json:
 *                          schema:
 *                              type: object
 *                              required: [nama]
 *                              properties:
 *                                  nama:
 *                                      type: string
 *                                  hp:
 *                                      type: string
 *                                  asal:
 *                                      type: string
 *          response:
 *              "200":
 *                  description: Detail santri
 *                  required: true
 */

router.get('/santri/:id',async (req,res)=>{
    let id = req.params.id;
    let data = await SantriModel.santri_detail(id);
    if(data.length){
        res.jsonp(data[0]);
    }else{
    res.status(404).jsonp("Santri not found:(");
    }
});
router.get('/santri/:id',);

/** 
 * @swagger
 * tags:
 * name: Santri
 * description: Pengelolaan santri
*/

/**
 * @swagger
 * path: 
 *  /santri/:
 *      post:
 *          summary: Post santri
 *          tags: [santri]
 *          requestBody:
 *                  required: true
 *                  content: 
 *                      apliication/json:
 *                          schema:
 *                              type: object
 *                              required: [nama]
 *                              properties:
 *                                  nama:
 *                                      type: string
 *                                  hp:
 *                                      type: string
 *                                  asal:
 *                                      type: string
 *          response:
 *              "200":
 *                  description: Detail santri
 *                  required: true
 */

//post (menambah)
router.post('/santri', passport.authenticate('jwt',{session:false}), async (req,res)=>{
    let dataBaru = {
        nama:req.body.nama,
        hp:req.body.hp,
        asal:req.body.asal,
        foto:req.body.foto
    }
    let hasil = await SantriModel.santri_add(dataBaru);
    res.jsonp(hasil);
});


/** 
 * @swagger
 * tags:
 * name: Santri
 * description: Pengelolaan santri
*/

/**
 * @swagger
 * path: 
 *  /santri/:
 *      put:
 *          summary: Put santri
 *          tags: [santri]
 *          requestBody:
 *                  required: true
 *                  content: 
 *                      apliication/json:
 *                          schema:
 *                              type: object
 *                              required: [nama]
 *                              properties:
 *                                  nama:
 *                                      type: string
 *                                  hp:
 *                                      type: string
 *                                  asal:
 *                                      type: string
 *          response:
 *              "200":
 *                  description: Detail santri
 *                  required: true
 */

//put/patch (upload)
router.put('/santri/:id', async(req,res)=>{
    let id = req.params.id;
    let data = {
        nama:req.body.nama,
        hp:req.body.hp,
        asal:req.body.asal,
        foto:req.body.foto
    }
    let status = await SantriModel.santri_update(data,id);
    res.jsonp(status)
});

/** 
 * @swagger
 * tags:
 * name: Santri
 * description: Pengelolaan santri
*/

/**
 * @swagger
 * path: 
 *  /santri/:
 *      delete:
 *          summary: Delete santri
 *          tags: [santri]
 *          requestBody:
 *                  required: true
 *                  content: 
 *                      apliication/json:
 *                          schema:
 *                              type: object
 *                              required: [nama]
 *                              properties:
 *                                  nama:
 *                                      type: string
 *                                  hp:
 *                                      type: string
 *                                  asal:
 *                                      type: string
 *          response:
 *              "200":
 *                  description: Detail santri
 *                  required: true
 */

//delete
router.delete('/santri/:id', async (req,res)=>{
    let id = req.params.id;
    let status = await SantriModel.santri_delete(id);
    res.jsonp(status);
});

// C >> Create (post)
// R >> Read (get)
// U >> Update (put)
// D >> Delete (delete)

// ========= users==========

//get
router.get('/users',async (req,res)=>{
    let data = await UsersModel.users_list();
    res.jsonp(data);
});
router.get('/users/:id',async (req,res)=>{
    let id = req.params.id;
    let data = await UsersModel.users_detail(id);
    if(data.length){
        res.jsonp(data[0]);
    }else{
    res.status(404).jsonp("users not found:(");
    }
});
router.get('/users/:id',);
//post (menambah)
router.post('/users',async (req,res)=>{
    let dataBaru = {
        email:req.body.email,
        password:req.body.password
    }
    let hasil = await UsersModel.users_add(dataBaru);
    res.jsonp(hasil);
});

//put/patch (upload)
router.put('/users/:id', async(req,res)=>{
    let id = req.params.id;
    let data = {
        email:req.body.email,
        password:req.body.password
    }
    let status = await UsersModel.users_update(data,id);
    res.jsonp(status)
});

//delete
router.delete('/users/:id', async (req,res)=>{
    let id = req.params.id;
    let status = await UsersModel.users_delete(id);
    res.jsonp(status);
});

// Get Token (otentikasi)
router.post('/auth',
    passport.authenticate('local-login'),
    (req,res)=>{
        // generate JWT (Json Web Token)
        const body = {_id:req.user.id,_email:req.user.email};
        const token = jwt.sign({user:body},'rahasia');
        res.jsonp({token});        
})

module.exports = router;