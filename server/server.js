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

app.delete("/users/me/token", authenticate, async (request, response) => {
    try {
        await request.user.removeToken(request.token);
        response.status(200).send(user);
    } catch (error) {
        response.status(400).send(error);
    }
});


app.post("/todos", authenticate, (request, response) => {
    var todo = new ToDo({
        text: request.body,
        _creator: request.user._id
    });
    todo.save().then((savedObject) => {
        console.log(JSON.stringify(savedObject, undefined, 2));
        response.send(savedObject);
    }).catch((error) => {
        console.log(error);
        response.status(400);
        response.send(error);
    });
});

app.post("/users/login", async (request, response) => {
    let body = _.pick(request.body, ["email", "password"]);
    try {
        let user = await User.findByCredentials(body.email, body.password);
        let token = await user.generateAuthToken();
        response.header("x-auth", token).send(user);
    } catch (error) {
        response.status(400).send(error);
    }
});

app.post("/users", async (request, response) => {
    let body = _.pick(request.body, ["email", "password"]);
    let user = new User(body);
    try {
        let savedUser = await user.save();
        if (!savedUser) {
            console.log("Unable to save User document");
            response.status(404).send();
        } else {
            console.log(JSON.stringify(savedUser, undefined, 2));
            // response.send(savedUser);
            let token = await savedUser.generateAuthToken();
            response.header("x-auth", token).send(savedUser);
        }
    } catch (error) {
        console.log(error);
        response.status(400).send(error);
    }
});

app.get("/users/me", authenticate, (request, response) => {
    response.send(request.user);
});


app.get("/todos", authenticate, (request, response) => {
    ToDo.find({
        _creator: request.user._id
    }).then((toDosArray) => {
        response.send({
            toDosArray
        })
    }).catch((error) => {
        console.log(error);
        response.status(400);
        response.send(error);
    });
});

app.get("/todos/:id", authenticate, async (request, response) => {
    let id = request.params.id;
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    } else {
        try {
            let toDoObject = await ToDo.findOne({
                _id: id,
                _creator: request.user._id
            });
            if (!toDoObject) {
                response.status(404).send();
            } else {
                response.send({
                    toDoObject
                });
            }
        } catch (error) {
            console.log(error);
            response.status(400).send(error);
        }
    }
});

app.delete("/todos/:id", authenticate, (request, response) => {
    let id = request.params.id;
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    } else {
        ToDo.findOneAndRemove({
            _id: id,
            _creator: request.user._id
        }).then((deletedToDoDocument) => {
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


app.patch("/todos/:id", authenticate, (request, response) => {
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
        ToDo.findOneAndUpdate({
            _id: id,
            _creator: request.user._id
        }, {
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


