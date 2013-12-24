var passport = require('passport');

var AuthController = {

    login: function(req, res, next){

        passport.authenticate('local', function(err, user, info) {
            if (err) { 
                res.send(401, 'common error');
                return next (err); 
            }

            if (!user) {
                req.session.messages = [info.message];
                return res.send(401, info.message);
            }

            req.logIn(user, function(err) {
                var response;

                if (err) { 
                    return res.send(401, 'wrong username or password'); 
                }

                response = user;
                response.sid = req.sessionID;

                return res.send(response);
            });
        }) (req, res, next);    
    },

    session: function(req, res){
        if (req.isAuthenticated()){
            var response = req.session.passport.user;
            response.sid = req.sessionID;
            res.send(response);
        } else {
            res.send(401);
        }
    },

    logout: function(req, res){
        req.logout();
        res.send({id : null});
    }

};

exports = module.exports = AuthController;