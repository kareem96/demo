var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'appsp5'
})

// list santri
exports.users_list = async function(){
    // query ke tabel santri
    let sql = "SELECT * FROM user";
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
exports.users_detail = function(id){
    // query ke tabel santri
    let sql = "SELECT * FROM user WHERE id=?";
    return new Promise(resolve=>{
        connection.query(sql,[id],(e,r)=>{
            if(!e)resolve(r);
        })
    });
}

// tambah santri
exports.users_add = function(users){
    // query ke tabel santri
    let sql = "INSERT INTO user(email,password) values(?,?)";
    return new Promise(resolve=>{
        connection.query(sql,
            [users.email,users.password],
            (e,r)=>{
                if(!e)resolve(r);
            }    
        )
    })
}

// ubah santri
exports.users_update = function(users,id){
    // query ke tabel santri
    let sql = "UPDATE user set email=?,password=? where id=?";
    return new Promise(resolve=>{
        connection.query(
            sql,[users.email,users.password,id],
            (e,r)=>{if(!e)resolve(r)}
        );
    });
}

// hapus santri
exports.users_delete = function(id){
    // query ke tabel santri
    let sql = "DELETE FROM user WHERE id=?";
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