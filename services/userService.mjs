import { promiseGet } from "./dbService.mjs";
import passwordManagment from "../passwordManagment.mjs"

const USERS = "users"; 
async function getUser(query){ 
    const  newHahedPassword = await passwordManagment.passwordToHash(query.password)
    // query = { email: test@test.dk , password: "123456"}
    //send db query to get user hashed password in return
    const user = await promiseGet(USERS,  { email : query.email });
    //compare the query password with the hashed db password
    return await passwordManagment.compareHash(query.password, user[0].password);
}

export default {getUser}
