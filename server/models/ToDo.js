let mongoose = require("mongoose");
let ToDo = mongoose.model("ToDo", {
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

module.exports = {
    ToDo
};