require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;
const url = process.env.DB_CONNECTION;
const dbName = "NodeExam"

MongoClient.connect(url, {useUnifiedTopology: true}, (error, client) => {
    if (error) {
        throw new Error(error);
    }

    const db = client.db(dbName);
    const users = db.collection("users");

    //Testing if it works
    users.findOne( {"userName":"IgnaDa1"}, (error, result) => {
        if (error) {
            throw new Error(error);
        }

        client.close();
    });
});