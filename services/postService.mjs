import {promiseGet, promiseCreate, promiseUpdate, promiseDelete} from "./dbService.mjs";
import mongodb from "mongodb";



const POSTS = "posts";
//METHODS

//View or search for posts
async function getPosts(query) {
  if (typeof(query) === "string") {
    query = { _id : mongodb.ObjectID(query) }
  }
  return await promiseGet(POSTS, query);
};

async function searchPosts(query){
  return await promiseGet(POSTS, query);
}
//Create one post
async function createPost(newPost) {
  return await promiseCreate(POSTS, newPost);
}

//Update one post
async function updatePost(id, updates) {
  return await promiseUpdate(POSTS, id, updates, "set");
}

//Delete one post
async function deletePost(id) {
  return await promiseDelete(POSTS, id);
}


export default {getPosts, createPost, updatePost, deletePost}; 