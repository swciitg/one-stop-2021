const mongoose =  require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    microsoftid: String,
    emailid: String
})

const User = mongoose.model('user', UserSchema);

module.exports = User;