const mongoose = require("mongoose");
const { allIITGMess } = require("../../helpers/constants");

// Remove NONE from allIITGMess if it exists
const index = allIITGMess.indexOf("NONE");
if (index > -1) {
    allIITGMess.splice(index, 1);
}


const smcHABSchemaDefinition = allIITGMess.reduce((acc, hostel) => {
    acc[hostel] = {
            type: [String],
            default: [],
    };
    return acc;
}, {});

const habAdminSchema = new mongoose.Schema({
    opiResponseRecipients: {
        type: [String],
        default: [],
    },
    opiStartDate: {
        type: Date,
        default: null,
    },
    opiEndDate: {
        type: Date,
        default: null,
    },
    messChangeStartDate: {
        type: Date,
        default: null,
    },
    messChangeEndDate: {
        type: Date,
        default: null,
    },
    smcEmails: {...smcHABSchemaDefinition},
});
    

const HabAdmin = mongoose.model("HabAdmin", habAdminSchema);
module.exports = { HabAdmin };