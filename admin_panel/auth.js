import onestopAdmin from "../models/adminModel.js";

export default async function authenticate(email, password) {
    try {
        console.log(email, password);
        const user = await onestopAdmin.findOne({ email });
        if (!user) return false;
        const match = await user.comparePassword(password);
        if (!match) return false;
        return user;
    } catch (error) {
        return null;
    }
};
