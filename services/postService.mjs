import {promiseGet, promiseCreate, promiseUpdate, promiseDelete} from "./dbService.mjs";
import mongodb from "mongodb";



const POSTS = "posts";
//METHODS

//View or search for posts
function getPosts(query) {
  if (typeof(query) === "string") {
    query = { _id : mongodb.ObjectID(query) }
  }
  return promiseGet(POSTS, query);
};

function searchPosts(query){
  return promiseGet(POSTS, query);
}
//Create one post
function createPost(newPost) {
  return promiseCreate(POSTS, newPost);
}

//Update one post
function updatePost(id, updates) {
  return promiseUpdate(POSTS, id, updates, "set");
}

//Delete one post
function deletePost(id) {
  return promiseDelete(POSTS, id);
}


export default {getPosts, createPost, updatePost, deletePost}; 