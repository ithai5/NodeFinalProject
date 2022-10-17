import bcrypt from 'bcrypt'

const saltRounds = 12

function passwordToHash(password) {
    return bcrypt.hashSync(password, saltRounds)
}

function compareHash(password, hashed) {
    return bcrypt.compareSync(password, hashed)
}

export default { passwordToHash, compareHash }
