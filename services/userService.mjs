import { promiseGet, promiseCreate } from "./dbService.mjs";
import passwordManagement from "../passwordManagement.mjs"

const USERS = "users"; 
async function getUser(query){ 
    const  newHahedPassword = await passwordManagement.passwordToHash(query.password)
    // query = { email: test@test.dk , password: "123456"}
    //send db query to get user hashed password in return
    const user = await promiseGet(USERS,  { email : query.email });
    //compare the query password with the hashed db password
    return await passwordManagement.compareHash(query.password, user[0].password);
}

async function signUp(signUpInfo) {
    signUpInfo.password = await passwordManagement.passwordToHash(signUpInfo.password);

    return await (promiseCreate(USERS, signUpInfo));
}

async function getUsers(query) {
    if (typeof(query) === "string") {
      query = { _id : mongodb.ObjectID(query) }
    }
    return await (promiseGet(USERS, query));
  };

export default {getUser, signUp, getUsers}
