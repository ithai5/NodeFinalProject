import { promiseGet, promiseCreate } from "./dbService.mjs";
import passwordManagement from "../passwordManagement.mjs"

const USERS = "users"; 
async function userValidation(query){ 
    //send db query to get user hashed password in return
    const user = await promiseGet(USERS,  { email : query.email });
    //compare the query password with the hashed db password
    return await passwordManagement.compareHash(query.password, user[0].password) ? user : false;
}

async function signUp(signUpInfo) {
  let isCreated = false
    await promiseGet(USERS, {email: signUpInfo.email}).then(async users => {
       if (users.length === 0){
        signUpInfo.password = await passwordManagement.passwordToHash(signUpInfo.password);
        await promiseCreate(USERS, signUpInfo)
        isCreated = true
      }
    });
    return isCreated
    // signUpInfo.password = await passwordManagement.passwordToHash(signUpInfo.password);
    // return await (promiseCreate(USERS, signUpInfo));
}

async function getUsers(query) {
    if (typeof(query) === "string") {
      query = { _id : mongodb.ObjectID(query) }
    }
    return await (promiseGet(USERS, query));
  };

export default {userValidation, signUp, getUsers}
