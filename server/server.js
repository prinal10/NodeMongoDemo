const port = process.env.PORT || 3000;


let express = require("express");
let bodyParser = require("body-parser");
let {ObjectID} = require("mongodb");


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


app.get("/todos", (request, response) => {
    ToDo.find().then((toDosArray) => {
        response.send({
            toDosArray
        })
    }).catch((error) => {
        console.log(error);
        response.status(400);
        response.send(error);
    });
});

app.get("/todos/:id", (request, response) => {
    let id = request.params.id;
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    } else {
        ToDo.findById(id).then((toDoObject) => {
            if (!toDoObject) {
                response.status(404).send();
            } else {
                response.send({
                    toDoObject
                });
            }
        }).catch((error) => {
            console.log(error);
            response.status(400).send(error);
        });
    }
});


app.listen(port, () => {
    console.log("Server is running on port: ", port);
});


