const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let password = "password";

bcrypt.genSalt(10, (error, saltValue) => {
    bcrypt.hash(password, saltValue, (error, hashValue) => {
        console.log(hashValue);
        bcrypt.compare(password, hashValue, (error, result) => {
            console.log(result);
        });
    });
});


/*let data = {
    id: 13
};

let token = jwt.sign(data, "secret");
console.log(token);
let decodedToken = jwt.verify(token, "secret");
console.log(decodedToken);*/


/*
let message = "My name is Prinalchandra";
let hash = SHA256(message).toString();

console.log(message);
console.log(hash);

let data = {
    id: 4
};

let token = {
    data,
    hash: SHA256(JSON.stringify(data) + "some secret").toString()
};

var resultHash = SHA256(JSON.stringify(token.data) + "some secret").toString();

console.log(resultHash);
console.log(token.hash);*/


