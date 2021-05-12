require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;
const url = process.env.DB_CONNECTION;
const dbName = "NodeExam"

//View posts
function getPosts() {
  MongoClient.connect(url, {useUnifiedTopology: true}, (error, client) => {
    if (error) {
        throw new Error(error);
    }

    const db = client.db(dbName);
    const posts = db.collection("posts");
    
    posts.find( {}, (error, result) => {
        if (error) {
            throw new Error(error);
        }
        console.log(result);
        client.close();
    });
    
  });
};

//Create one post
function createPost(post) {
  MongoClient.connect(url, {useUnifiedTopology: true}, (error, client) => {
    if (error) {
        throw new Error(error);
    }

    const db = client.db(dbName);
    const posts = db.collection("posts");

    posts.insertOne( post, (error, result) => {
        if (error) {
            throw new Error(error);
        }
        console.log(result);
        client.close();
    });
    
  });
};

//Update one post
function updatePost(post) {
  MongoClient.connect(url, {useUnifiedTopology: true}, (error, client) => {
    if (error) {
        throw new Error(error);
    }

    const db = client.db(dbName);
    const posts = db.collection("posts");

    //first parameter is the query, the second are the updated values
    posts.updateOne( {id: post.id}, { $set: post }, (error, result) => {
        if (error) {
            throw new Error(error);
        }
        console.log(result);
        client.close();
    });
    
  });
};

//Delete one post
function deletePost(post) {
  MongoClient.connect(url, {useUnifiedTopology: true}, (error, client) => {
    if (error) {
        throw new Error(error);
    }

    const db = client.db(dbName);
    const posts = db.collection("posts");

    posts.deleteOne( {id: post.id}, (error, result) => {
        if (error) {
            throw new Error(error);
        }
        console.log(result);
        client.close();
    });
    
  });
};


module.exports = {
  postService: this.postService
}
