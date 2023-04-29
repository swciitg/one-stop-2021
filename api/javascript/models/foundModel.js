const mongoose = require("mongoose");

const foundDetailsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        date: { type: Date, default: Date.now },
        location: { type: String, required: true },
        submittedat: { type: String, required: true },
        description: { type: String, required: true },
        // imageURL: { type: String, required: true },
        // compressedImageURL: { type: String, required: true },
        // imageId: { type: String, required: true },
        photo_id: { type: String, required: true },
        email: { type: String, required: true },
        username: { type: String, required: true },
        claimed: { type: Boolean, default: false },
        claimerEmail: { type: String, default: "none" },
        claimerName: { type: String, default: "none" },
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                ret.imageURL = process.env.IMAGE_URL_ROOT + "getImage/" + ret.photo_id;
                ret.compressedImageURL =
                    process.env.IMAGE_URL_ROOT + "getCompressedImage/" + ret.photo_id;
                delete ret.imageId;
            },
        },
    }
);

module.exports = mongoose.model("foundItem", foundDetailsSchema);

// const mongoose = require("mongoose");

// const foundDetailsSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     date: { type: Date, required: true },
//     location: { type: String, required: true },
//     submittedat: { type: String, required: true },
//     description: { type: String, required: true },
//     link: { type: String, required: true },
//     creation: { type: Date, default: Date.now },

// });

// module.exports = mongoose.model("foundDetails", foundDetailsSchema);
