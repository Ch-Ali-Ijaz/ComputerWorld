import OTP from "../models/otp.js";

// Generated OTP
export async function generateOtp(email) {

    await OTP.deleteMany({ userEmail: email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 5 * 60 * 1000;

    const newOtp = new OTP({
        userEmail: email,
        OneTimePassword: otp,
        attempts: 0,
        expiresAt: expiry
    });

    const computerizedOtp = await newOtp.save();
    return computerizedOtp.OneTimePassword;

};