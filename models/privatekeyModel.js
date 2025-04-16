import mongoose from 'mongoose';

const privateKeySchema = new mongoose.Schema({
    privateKey: {
        type: String,
        required: true
    }
});

const PrivateKey = mongoose.model('PrivateKey', privateKeySchema);

export default PrivateKey;