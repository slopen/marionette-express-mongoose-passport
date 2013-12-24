var express = require('express'),
    path = require('path'),
    http = require('http');

// db connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/items-test-db');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', function(){
    console.log('Connected to mongoose');
});


// Passport configuration
var passport = require('passport');
var User = require('./models/user.js') (db);

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);
passport.use(User.localStrategy);


var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));

    app.use(express.bodyParser()),
    app.use(express.methodOverride());
    app.use(express.cookieParser());

    app.use(express.session({
        secret: "abcdfg hijklmn opqrstu",
        cookie: {maxAge: 3600000},
        maxAge: 3600000,
        connection : db   
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(app.router);
    app.use(express.static (path.join(__dirname, 'static')));
    
});
 
var auth = require('./routes/login.js');
var items = require('./routes/items') (db);


app.post('/session', auth.login);
app.put('/session', auth.login);
app.get('/session', auth.session);
app.delete('/session', auth.logout);

app.get('/items', ensureAuth, items.findAll);
app.get('/items/:id', ensureAuth, items.findById);
app.put('/items/:id', ensureAuth, items.updateItem);
app.delete('/items/:id', ensureAuth, items.deleteItem);
app.post('/items', ensureAuth, items.addItem);
 
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});


function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) { 
    return next(); 
  } else {
    res.send(401, {error: 'authorization required'});
  }
};
