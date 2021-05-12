import bcrypt from "bcrypt";

const saltRounds = 12;


function passwordToHash (password){
    return bcrypt.hashSync("hello", saltRounds)
}

export default passwordToHash

