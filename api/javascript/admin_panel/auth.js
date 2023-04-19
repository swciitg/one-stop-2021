const User = require("../models/onestopUserModel");
module.exports = async function authenticate(email, password) {
    try {
        const user = await User.findOne({ email });
        if (!user) return null;
        const match = await user.comparePassword(password);
        if (!match) return null;
        return user;
    } catch (error) {
        return null;
    }
};
