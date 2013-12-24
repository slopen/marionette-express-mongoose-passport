var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    PassportLocalStrategy = require('passport-local').Strategy;

var schema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        trim: true, 
        lowercase: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    created: {
        type: Date, 
        default: Date.now
    }
});

schema.statics.localStrategy = new PassportLocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },

    function (username, password, done){

        var User = require('./user.js') (mongoose.connection);

        User.findOne({email: username}, function (err, user){

            if (err) { 
                return done (err); 
            }

            if (!user){
                return done(null, false, { message: 'User not found.'} );
            }
            if (!user.validPassword (password)){
                return done(null, false, { message: 'Incorrect password.'} );
            }

            return done(null, {
                id: user._id,
                email: user.email
            });
        });
    }
);

schema.methods.validPassword = function (password){
    if (this.password == password){
        return true;
    }

    return false;
}

schema.statics.serializeUser = function (user, done){
    done(null, user);
};

schema.statics.deserializeUser = function (obj, done){
    done(null, obj);
};

var User = function(db){
    return db.model('user', schema);
};

exports = module.exports = User;