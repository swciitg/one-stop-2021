const User = require("../models/onestopUserModel");
module.exports = async function authenticate(email, password) {
    try {
        const user = await User.findOne({ email });
        if (!user) return false;
        const match = await user.comparePassword(password);
        if (!match) return false;
        return user;
    } catch (error) {
        return null;
    }
};
