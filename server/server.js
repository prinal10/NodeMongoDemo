let mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

/*let ToDo = mongoose.model("ToDo", {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true

    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: 0
    }
});
let newToDo = new ToDo({
    text:  "Learning NodeJs"
});

newToDo.save().then((savedObject) => {
    console.log(JSON.stringify(savedObject, undefined, 2));
}).catch((error) => {
    console.log(error);
});*/

let User = mongoose.model("User", {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    }
});

let user1 = new User({
    email: "prinal@gmail.com"
});
user1.save().then((savedObject) => {
    console.log(JSON.stringify(savedObject, undefined, 2));
}).catch((error) => {
    console.log(error);
});
