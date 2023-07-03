const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const roles = require("../admin_panel/roles");

var roleValues = [];
for(var k in roles) roleValues.push(roles[k]);

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
                enum: roleValues
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

module.exports = adminModel;
