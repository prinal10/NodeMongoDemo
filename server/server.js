require("./config/config.js");
const port = process.env.PORT;
const _ = require("lodash");
const bcrypt = require("bcryptjs");


let express = require("express");
let bodyParser = require("body-parser");
let {ObjectID} = require("mongodb");


let {User} = require("./models/User.js");
let {ToDo} = require("./models/ToDo.js");
let {mongoose} = require("./db/mongoose.js");
let {authenticate} = require("./middleware/authenticate");

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

app.post("/users/login", (request, response) => {
    let body = _.pick(request.body, ["email", "password"]);
    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            response.header("x-auth", token).send(user);
        });
    }).catch((error) => {
        response.status(400).send(error);
    });
});

app.post("/users", (request, response) => {
    let body = _.pick(request.body, ["email", "password"]);
    let newUser = new User(body);
    newUser.save().then((savedUser) => {
        if (!savedUser) {
            console.log("Unable to save User document");
            response.status(404).send();
        } else {
            console.log(JSON.stringify(savedUser, undefined, 2));
            // response.send(savedUser);
            return savedUser.generateAuthToken();
        }
    }).then((token) => {
        response.header("x-auth", token).send(newUser);
    }).catch((error) => {
        console.log(error);
        response.status(400).send(error);
    });
});

app.get("/users/me", authenticate, (request, response) => {
    response.send(request.user);
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

app.delete("/todos/:id", (request, response) => {
    let id = request.params.id;
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    } else {
        ToDo.findByIdAndRemove(id).then((deletedToDoDocument) => {
            if (!deletedToDoDocument) {
                console.log("Unable to find document by Id: ", id);
                response.status(404).send();
            } else {
                console.log("Deleted: ", deletedToDoDocument);
                response.send(deletedToDoDocument);
            }
        }).catch((error) => {
            console.log(error);
            response.status(400).send(error);
        });
    }
});


app.patch("/todos/:id", (request, response) => {
    let id = request.params.id;
    let body = _.pick(request.body, ["text", "completed"]);
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    } else {
        if (_.isBoolean(body.completed && body.completed)) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }
        ToDo.findByIdAndUpdate(id, {
            $set: body
        }, {
            new: true
        }).then((updatedDocument) => {
            if (!updatedDocument) {
                console.log("Unable to find document by Id: ", id);
                response.status(404).send();
            } else {
                console.log("Updated: ", updatedDocument);
                response.send(updatedDocument);
            }
        }).catch((error) => {
            console.log(error);
            response.status(400).send(error);
        })
    }
});


app.listen(port, () => {
    console.log("Server is running on port: ", port);
});


