var Users = require('../models/Users.js');

// list all santri
exports.admin = async function(req,res){
    // res.send("BELUM_JADI: List all santri");
    let data = await Users.users_list();
    if(data){
        res.render('users/admin',{list_santri:data});
    }else{
        res.send("Data tidak ditemukan");
    }
    
}

// list all santri
exports.users_list = async function(req,res){
    // res.send("BELUM_JADI: List all santri");
    let data = await Users.users_list();
    if(data){
        res.render('users/list',{data_users:data});
    }else{
        res.send("Data tidak ditemukan");
    }
    
}

// detail santri berdasarkan id
exports.users_detail = async function(req,res){
    let users = await Users.users_detail(req.params.id);
    if(users){
        res.render('users/detail',{users:users[0]});
    }
    // res.render("BELUM_JADI: List detail santri");
}
// form santri
exports.users_form = function(req,res){
    res.render('users/form_users');
}

// tambah santri
exports.users_add = async function(req,res){
    // baca data dari form
    var data = {
        email:req.body.email,
        password:req.body.password,
    }
    let add = await Users.users_add(data);
    if(add){
        res.redirect('/users');
    }else{
        res.redirect('/users/create');
    }
}

// ubah santri
exports.users_update = function(req,res){
    res.send("BELUM_JADI: Update santri");
}

// hapus santri
exports.users_delete = async function(req,res){
    let id = req.params.id;
    let hapus = await Users.users_delete(id);
    if(hapus){
        res.redirect('/users')
    }else{
        res.send('Gagal Hapus-'+id);
    }
}

// tambah foto santri
exports.santri_upload = function(req,res){
    res.send("BELUM_JADI: Upload foto santri");
}