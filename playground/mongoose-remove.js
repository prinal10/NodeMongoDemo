let {mongoose} = require("./../server/db/mongoose.js");
let {ObjectID} = require("mongodb");
let {ToDo} = require("./../server/models/ToDo.js");
let {User} = require("./../server/models/User.js");

let toDo_id = "5c45692306f76a2588a109b8";
let user_id = "5c456d8485b5ad32a460bf22";

if (!ObjectID.isValid(user_id)) {
    console.log("Id is not valid");
}

ToDo.remove({}).then((removeResult) => {
    console.log(removeResult);
}).catch((error) => {
    console.log(error);
});

ToDo.findOneAndRemove({
    _id: toDo_id
}).then((deletedDocument) => {
    console.log(deletedDocument);
}).catch((error) => {
    console.log(error);
});

ToDo.findByIdAndRemove(toDo_id).then((deletedDocument) => {
    console.log(deletedDocument);
}).catch((error) => {
    console.log(error);
});
