var Santri = require('../models/Santri.js');

// list all santri
exports.admin = async function(req,res){
    // res.send("BELUM_JADI: List all santri");
    let data = await Santri.santri_list();
    if(data){
        res.render('santri/admin',{list_santri:data});
    }else{
        res.send("Data tidak ditemukan");
    }
    
}

// list all santri
exports.santri_list = async function(req,res){
    // res.send("BELUM_JADI: List all santri");
    let data = await Santri.santri_list();
    if(data){
        res.render('santri/list',{data_santri:data});
    }else{
        res.send("Data tidak ditemukan");
    }
    
}

// detail santri berdasarkan id
exports.santri_detail = async function(req,res){
    let santri = await Santri.santri_detail(req.params.id);
    if(santri){
        res.render('santri/detail',{santri:santri[0]});
    }
    // res.render("BELUM_JADI: List detail santri");
}
// form santri
exports.santri_form = function(req,res){
    res.render('santri/form_santri');
}

// tambah santri
exports.santri_add = async function(req,res){
    // baca data dari form
    var data = {
        nama:req.body.nama,
        hp:req.body.hp,
        asal:req.body.asal,
        foto:req.body.foto
    }
    let add = await Santri.santri_add(data);
    if(add){
        res.redirect('/santri');
    }else{
        res.redirect('/santri/create');
    }
}

// ubah santri
exports.santri_update = function(req,res){
    res.send("BELUM_JADI: Update santri");
}

// hapus santri
exports.santri_delete = async function(req,res){
    let id = req.params.id;
    let hapus = await Santri.santri_delete(id);
    if(hapus){
        res.redirect('/santri')
    }else{
        res.send('Gagal Hapus-'+id);
    }
}

// tambah foto santri
exports.santri_upload = function(req,res){
    let id = req.params.id;
    res.render('santri/update',{id:id});
}