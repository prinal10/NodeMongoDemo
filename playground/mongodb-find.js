//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb"); //destructuring


MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, client) => {
    if (error) {
        console.log("Cannot connect to MongoDB server, error: ", error);
    } else {
        console.log("Successfully connected to MongoDB server!!");
        let dbObject = client.db("TodoApp");
        /*dbObject.collection("ToDos").find({
            _id: new ObjectID("5c4549cf4800d639f45504a5")
        }).toArray().then((todoArrayObject) => {
            console.log("ToDos: ", JSON.stringify(todoArrayObject, undefined, 2));
        }).catch((error) => {
            console.log("Unable to get all ToDos Documents", error);
        });*/

        /*dbObject.collection("ToDos").find({
            _id: new ObjectID("5c4549cf4800d639f45504a5")
        }).count().then((todoCountObject) => {
            console.log("ToDos: ", JSON.stringify(todoCountObject, undefined, 2));
        }).catch((error) => {
            console.log("Unable to get all ToDos Documents", error);
        });*/
        dbObject.collection("Users").find({
            name: "Arpit Patel"
        }).toArray().then((usersArrayObject) => {
            console.log("Users: ", JSON.stringify(usersArrayObject, undefined, 2));
        }).catch((error) => {
            console.log("Unable to get all Users Documents", error);
        });
        //client.close();
    }
});