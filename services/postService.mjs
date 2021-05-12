import {loadDB} from "./dbService.mjs"
import mongodb from "mongodb"


//PROMISES

//Promise for getPosts()
const prGetPosts = async () => {
  //Load an instance of mongoDB
  const db = await loadDB();

  return new Promise((resolve, reject) => {
    //Empty query: Return all posts.
    db.collection("posts").find({}).toArray((error, result) => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve(result);
      }
    });
  });
}

//Promise for createPost()
const prCreatePost = async (newPost) => {
  const db = await loadDB();

  return new Promise((resolve, reject) => {
    db.collection("posts").insertOne(newPost, (error, result) => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve(result);
      }
    });
  });
}

//Promise for updatePost()
const prUpdatePost = async (id, updates) => {
  const db = await loadDB();

  return new Promise((resolve, reject) => {
    db.collection("posts").updateOne( {_id: mongodb.ObjectID(id)}, {$set: updates}, (error, result) => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve(result);
      }
    });
  });
}

//Promise for deleting a post
const prDeletePost = async (id) => {
  const db = await loadDB();
  
  return new Promise((resolve, reject) => {
    db.collection("posts").deleteOne({ _id: new mongodb.ObjectID(id) }, (error, result) => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve(result);
      }
    });
  });
}


//METHODS

//View posts
async function getPosts() {
  return await (prGetPosts());
};

//Create one post
async function createPost(newPost) {
  return await (prCreatePost(newPost));
}

//Update one post
async function updatePost(id, updates) {
  return await (prUpdatePost(id, updates));
}

//Delete one post
async function deletePost(id) {
  return await (prDeletePost(id));
}


export default {getPosts, createPost, updatePost, deletePost}; 