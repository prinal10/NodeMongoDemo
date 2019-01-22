let mongoose = require("mongoose");
let validator = require("validator");
let jwt = require("jsonwebtoken");
let _ = require("lodash");


let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not a valid email.`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ["_id", "email"]);
};

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = "auth";
    let token = jwt.sign({_id: user._id.toHexString(), access}, "secret").toString();
    user.tokens = user.tokens.concat({access, token});
    return user.save().then(() => {
        return token;
    });

};

UserSchema.statics.findByToken = function (token) {
    let User = this;
    let decoded;
    try {
        decoded = jwt.verify(token, "secret");
    } catch (e) {
        /*return new Promise((resolve, reject) => {
            reject();
        });*/
        return Promise.reject("Cannot authenticate");
    }
    return User.findOne({
        "_id": decoded._id,
        "tokens.access": "auth",
        "tokens.token": token
    });
};

let User = mongoose.model("User", UserSchema);

module.exports = {
    User
};