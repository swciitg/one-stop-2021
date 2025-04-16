import mongoose from "mongoose";
import bcrypt from "bcrypt";
import roles from "../admin_panel/roles.js";

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [
            { 
                type: String, 
                enum: Object.values(roles)
            }
        ]
    }
});

adminSchema.pre("save", async function (next) {
    console.log("HASHING PASSWORD");
    if (!this.isModified("password")) {
        return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    console.log(hashed);
    this.password = hashed;
    return next();
});

adminSchema.pre("findOneAndUpdate", async function (next) {
    console.log("HASHING UPDATED PASSWORD");
    const update = this.getUpdate();
    console.log(update);
    let thisAdmin = await adminModel.findById(update.$set._id);
    if (thisAdmin.password!==update.$set.password){
        // password changed from admin panel
        const hashed = await bcrypt.hash(update.$set.password, 10);
        console.log(hashed);
        update.$set.password = hashed;
        return next();
    }
    return next();
});

adminSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        console.log(candidatePassword,this.password);
        console.log(await bcrypt.hash(candidatePassword, 10));
        const match = await bcrypt.compare(candidatePassword, this.password);
        return match;
    } catch (error) {
        return false;
    }
};

const adminModel = mongoose.model("onestopAdmin", adminSchema);

export default adminModel;
