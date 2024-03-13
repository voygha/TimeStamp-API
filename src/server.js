const express = require('express');
require ("dotenv").config();
const exphbs= require("express-handlebars");
const  morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Configura body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Initializations

/* require('./config/passport'); */

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + '/views/'));

//partials -  //layouts
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir:path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
    })
  );
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
/* app.use('/api', FlexProperties); */

//Global Variables
//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    //guardar si el usuario esta logueado
    res.locals.user = req.user || null;
    next();
  });

//Static Files 
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use(require('./routes/index.routes'));

module.exports = app;
