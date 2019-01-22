let express = require("express");
let bodyParser = require("body-parser");


let {User} = require("./models/User.js");
let {ToDo} = require("./models/ToDo.js");
let {mongoose} = require("./db/mongoose.js");

let app = express();
app.use(bodyParser.json());

app.post("/todos", (request, response) => {
    var todo = new ToDo(request.body);
    todo.save().then((savedObject) => {
        console.log(JSON.stringify(savedObject, undefined, 2));
        response.send(savedObject);
    }).catch((error) => {
        console.log(error);
        response.status(400);
        response.send(error);
    });
});


app.listen(3000, () => {
    console.log("Server is running on port: ", 3000);
});


