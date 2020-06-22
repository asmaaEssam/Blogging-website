const bcrypt = require("bcryptjs")

module.exports = async(password)=>
{
    const saltRounds = 8;
    const hashedPassword= await bcrypt.hash(password,saltRounds)
    return hashedPassword
}