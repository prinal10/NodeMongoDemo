//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb"); //destructuring


MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, client) => {
    if (error) {
        console.log("Cannot connect to MongoDB server, error: ", error);
    } else {
        console.log("Successfully connected to MongoDB server!!");
        let dbObject = client.db("TodoApp");
        // dbObject.collection("ToDos").insertOne({
        //     text: "Something to do!!",
        //     completed: false
        // }, (error, result) => {
        //     if (error) {
        //         console.log("Unable to insert Todos Object, error: ", error);
        //     } else {
        //         console.log(JSON.stringify(result.ops, undefined, 2));
        //     }
        // });

        /*dbObject.collection("Users").insertOne({
            name: "Prinalchandra Patel",
            age: 26,
            location: "Utah"
        }, (error, savedDocumentObject) => {
            if (error) {
                console.log("Unable to insert Users Object, error: ", error);
            } else {
                console.log(JSON.stringify(savedDocumentObject.ops, undefined, 2));
                console.log("TimeStamp: ", savedDocumentObject.ops[0]._id.getTimestamp());
            }
        });*/
        client.close();
    }
});