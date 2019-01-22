let {User} = require("./../models/User.js");

let authenticate = (request, response, next) => {
    let token = request.header("x-auth");
    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject("Cannot authenticate");
        } else {
            request.user = user;
            request.token = token;
            next();
        }
    }).catch((error) => {
        response.status(401).send(error);
    });
};

module.exports = {authenticate};