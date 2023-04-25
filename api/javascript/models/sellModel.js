const mongoose = require("mongoose");

const BuyAndSellDetailsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: String, required: true },
        date: { type: Date, default: Date.now },
        // location: { type: String, required: true },
        phonenumber: { type: String, required: true },
        description: { type: String, required: true },
        // photo_id: { type: String, required: true },
        // imageURL: { type: String, required: true },
        imageId: { type: String, required: true },
        // compressedImageURL: { type: String, required: true },
        email: { type: String, required: true },
        username: { type: String, required: true },
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                ret.imageURL = process.env.IMAGE_URL_ROOT + "getImage?photo_id=" + ret.imageId;
                ret.compressedImageURL =
                    process.env.IMAGE_URL_ROOT + "getCompressedImage?photo_id=" + ret.imageId;
                delete ret.imageId;
            },
        },
    }
);

module.exports = mongoose.model("sellItem", BuyAndSellDetailsSchema);
