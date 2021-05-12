import {loadDB} from "./dbService.mjs"

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
    db.collection("posts").updateOne( {id: id}, {$set: updates}, (error, result) => {
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
    db.collection("posts").deleteOne( {id: id}, (error, result) => {
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
async function createPost(post) {
  return await (prCreatePost());
}

//Update one post
async function updatePost(post) {
  return await (prUpdatePost());
}

//Delete one post
async function deletePost(post) {
  return await (prDeletePost());
}


export default {getPosts, createPost, updatePost, deletePost}; 