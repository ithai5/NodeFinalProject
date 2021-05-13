import { promiseGet } from "./dbService.mjs";
import passwordManagment from "../passwordManagment.mjs"

console.log(passwordManagment.passwordToHash(123456));

async function getUser(query){ 
    
console.log(passwordManagment.passwordToHash(query.password));
    // query = { email: example@mail.com , password: "123456"}
    //send db query to get user hashed password in return
    const user = await promiseGet(query = { email : query.email })
    //compare the query password with the hashed db password
    //retrun if login succes
    return await passwordManagment.compareHash(query.password, user.password)

    
}

export default {}
