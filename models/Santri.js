var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'appsp5'
})

// list santri
exports.santri_list = async function(){
    // query ke tabel santri
    let sql = "SELECT * FROM santri";
    return new Promise(resolve=>{
    connection.query(sql,(err,result) => {
        if(!err){
            console.log("Sukses:",result);
            resolve(result);
        }else{
            console.log("Terjadi kesalahan:",err);
            resolve ([]);
        }
    })});
    return [];
}

// detail santri
exports.santri_detail = function(id){
    // query ke tabel santri
    let sql = "SELECT * FROM santri WHERE id=?";
    return new Promise(resolve=>{
        connection.query(sql,[id],(e,r)=>{
            if(!e)resolve(r);
        })
    });
}

// tambah santri
exports.santri_add = function(santri){
    // query ke tabel santri
    let sql = "INSERT INTO santri(nama,hp,asal,foto) values(?,?,?,?)";
    return new Promise(resolve=>{
        connection.query(sql,
            [santri.nama,santri.hp,santri.asal,santri.foto],
            (e,r)=>{
                if(!e)resolve(r);
            }    
        )
    })
}

// ubah santri
exports.santri_update = function(santri,id){
    // query ke tabel santri
    let sql = "UPDATE santri set nama=?,hp=?,asal=?,foto=? where id=?";
    return new Promise(resolve=>{
        connection.query(
            sql,[santri.nama,santri.hp,santri.asal,santri.foto,id],
            (e,r)=>{if(!e)resolve(r)}
        );
    });
}

// hapus santri
exports.santri_delete = function(id){
    // query ke tabel santri
    let sql = "DELETE FROM santri WHERE id=?";
    return new Promise(resolve=>{
        connection.query(sql,[id],(e,r)=>{
            if(!e) resolve(r);
        })
    });
}

// upload foto
exports.santri_upload = function(foto){
    // query ke tabel santri
    let sql = "SELECT * FROM santri";
    return [];
}