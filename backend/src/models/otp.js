import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        unique: true,
        required: true
    },
    
    OneTimePassword: {
        type: String, 
        required: true
    },

    attempts: {
        type: Number,
        required: true
    },
    
    expiresAt: {
        type: Date,
        required: true,
        index: {expires: 0}
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const OTP = mongoose.model("OTP", otpSchema);
export default OTP