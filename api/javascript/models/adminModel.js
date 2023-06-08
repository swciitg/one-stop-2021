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
    if (!this.isModified("password")) {
        return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
});

adminSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const match = await bcrypt.compare(candidatePassword, this.password);
        return match;
    } catch (error) {
        return false;
    }
};

module.exports = mongoose.model("onestopAdmin", adminSchema);
