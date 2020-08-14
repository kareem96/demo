var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var session = require('express-session');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var multer = require('multer');
// var upload = multer({dest:'uploads/'});

//rename file
var storage = multer.diskStorage({
  filename:(req,file,cb)=>{
    // let id = req.body.id; 
    let id = req.params.id
  cb(null,id
      +path.extname(file.originalname));
  },
  destination:(req,file,cb)=>{
    cb(null,'uploads/');
  }
})
var upload = multer({storage:storage});

app.post('/uploadfoto/:id',upload.single('fotoprofile'),
(req,res)=>{
  //simpan ke database
  let id =req.params.id;
  let sql = "UPDATE santri SET foto=? WHERE id=?";
  let namaFile=req.params.id+path.extname(req.file.originalname);
  con.query(sql,[namaFile,id],(e,s)=>{
    if(!e){res.redirect('/santri/admin')}
    });
});



// ======================================
var flash = require('connect-flash');
app.use(flash());
var passport = require('passport');
require('./auth/auth');

app.use(passport.initialize());
app.use(passport.session());
app.post('/.auth',
  passport.authenticate(
    'local-login',
    {
      successRedirect:'/santri/admin',
      failureRedirect: '/login',
      failureFlash: true
    }
)
)
app.get('/login',function(req,res){
  res.render('login',{message:req.flash('loginMessage')})
})


// ======================================
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var santriRouter = require('./routes/santri');
var apiRouter = require('./routes/api');

// view engine setup
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// definisikan folder static untuk mdl.
app.use(express.static(path.join(__dirname, '/node_modules/material-design-lite')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/santri', santriRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;