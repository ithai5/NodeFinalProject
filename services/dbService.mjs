import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;
const url = process.env.DB_CONNECTION;
const dbName = "NodeExam"

let db;

const loadDB = async () => {
    if (db) {
        return db;
    }
    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology : true });
        db = client.db(dbName);
    } catch (err) {
        new Error(error);
    }
    return db;
};

//PROMISES

//Promise for get all from collection()
// const promiseGetAll = async (collection) => {
//     //Load an instance of mongoDB
//     const db = await loadDB();
  
//     return new Promise((resolve, reject) => {
//       //Empty query: Return all posts.
//       db.collection(collection).find({}).toArray((error, result) => {
//         if (error) {
//           reject(new Error(error));
//         } else {
//           resolve(result);
//         }
//       });
//     });
//   }
  
  const promiseGet = async (collection, query) => {
    const db = await loadDB();
    if (query === undefined) query = {} //checks if the query was passed as an arguemnt
    return new Promise((resolve, reject) => {
      db.collection(collection).find(query).toArray((error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      }) 
    });
  }
  
  //Promise for createPost()
  const promiseCreate = async (collection, query) => {
    const db = await loadDB();
  
    return new Promise((resolve, reject) => {
      db.collection(collection).insertOne(query, (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  }
  
  //Promise for updatePost()
  const promiseUpdate = async (collection, id, updates) => {
    const db = await loadDB();
  
    return new Promise((resolve, reject) => {
      db.collection(collection).updateOne( { _id : mongodb.ObjectID(id) }, { $set : updates }, (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  }
  
  //Promise for deleting a post
  const promiseDelete = async (collection, id) => {
    const db = await loadDB();
    
    return new Promise((resolve, reject) => {
      db.collection(collection).deleteOne({ _id : new mongodb.ObjectID(id) }, (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  }
  
  
  export { promiseGet, promiseCreate, promiseUpdate, promiseDelete }
