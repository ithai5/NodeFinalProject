import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;
const url = process.env.DB_CONNECTION;
const dbName = "NodeExam"

let db;

export const loadDB = async () => {
    if (db) {
        return db;
    }
    try {
        console.log("Try block!");
        const client = await MongoClient.connect(url, {useUnifiedTopology: true});
        db = client.db(dbName);
    } catch (err) {
        new Error(error);
    }
    return db;
};

