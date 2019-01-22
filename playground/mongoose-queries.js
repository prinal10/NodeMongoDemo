let {mongoose} = require("./../server/db/mongoose.js");
let {ObjectID} = require("mongodb");
let {ToDo} = require("./../server/models/ToDo.js");
let {User} = require("./../server/models/User.js");

let toDo_id = "5c45692306f76a2588a109b8";
let user_id = "5c456d8485b5ad32a460bf22";

if (!ObjectID.isValid(user_id)){
    console.log("Id is not valid");
}

/*ToDo.find({
    _id: toDo_id
}).then((toDosArray) => {
    console.log("ToDos: ", toDosArray);
}).catch((error) => {
    console.log(error);
});

ToDo.findOne({
    _id: toDo_id
}).then((toDoObject) => {
    if (!toDoObject) {
        console.log("Cannot find ToDo object with Id: ", id);
    } else {
        console.log("One ToDo: ", toDoObject);
    }
}).catch((error) => {
    console.log(error);
});

ToDo.findById(toDo_id).then((toDoObject) => {
    console.log("ToDo by ID: ", toDoObject);
}).catch((error) => {
    console.log(error);
});*/

User.findById(user_id).then((userObject) => {
    if(!userObject) {
        console.log("Cannot find User Document with ID: ", user_id);
    } else {
        console.log("User: ", userObject);
    }
}).catch((error) => {
    console.log(error);
});