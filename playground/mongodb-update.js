//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb"); //destructuring


MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, client) => {
    if (error) {
        console.log("Cannot connect to MongoDB server, error: ", error);
    } else {
        console.log("Successfully connected to MongoDB server!!");
        let dbObject = client.db("TodoApp");

        /*dbObject.collection("ToDos").findOneAndUpdate({
            _id: new ObjectID("5c455e18c61099376844b3f8")
        }, {
            $set: {
                completed: true
            }
        }, {
            returnOriginal: false
        }).then((updatedTodosObject) => {
            console.log(JSON.stringify(updatedTodosObject, undefined, 2));
        }).catch((error) => {
            console.log(error);
        });*/
        dbObject.collection("Users").findOneAndUpdate({
            _id: new ObjectID("5c4551b04808b0482899dd28")
        }, {
            $set: {
                name: "Pinakin Patel",
                location: "New Zealand"
            }
        }, {
            returnOriginal: false
        }).then((updatedUserObject) => {
            console.log(JSON.stringify(updatedUserObject, undefined, 2));
        }).catch((error) => {
            console.log(error);
        });


        //client.close();
    }
});