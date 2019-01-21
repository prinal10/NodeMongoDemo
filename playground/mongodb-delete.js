//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb"); //destructuring


MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, client) => {
    if (error) {
        console.log("Cannot connect to MongoDB server, error: ", error);
    } else {
        console.log("Successfully connected to MongoDB server!!");
        let dbObject = client.db("TodoApp");
        /*dbObject.collection("ToDos").deleteMany({
            text: "Eat Lunch"
        }).then((deleteResults) => {
            console.log(deleteResults);
        }).catch((error) => {
            console.log("Error: ", error);
        });*/
        /*dbObject.collection("ToDos").deleteOne({
            text: "Eat Lunch"
        }).then((deletedResult) => {
            console.log(deletedResult);
        }).catch((error) => {
            console.log("Error: ", error);
        });*/
        dbObject.collection("ToDos").findOneAndDelete({
            completed: false
        }).then((deletedTodosObject) => {
            console.log(JSON.stringify(deletedTodosObject, undefined, 2));
        }).catch((error) => {
            console.log("Error: ", error);
        });
        //client.close();
    }
});