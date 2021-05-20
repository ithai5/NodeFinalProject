import bcrypt from "bcrypt";

const saltRounds = 12;


function passwordToHash (password){
    return bcrypt.hashSync(password, saltRounds);
}

function  compareHash (password, hashed){
    const result =  bcrypt.compareSync(password, hashed);
    return result
}

export default {passwordToHash, compareHash}

