import * as authServices from "../services/authServices.js";


// Controller to authenticate user for login.
export async function searchUser(req, res) {
    try {
        const credentials = req.body;
        const userVerification = await authServices.searchUser(credentials);
        
        if (!userVerification.success) {
            return res.status(404).json({ message: "Invalid Credentials" });
        }

        res.cookie("accessToken", userVerification.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({ code: "LOGIN_SUCCESS", message: "Login Successful" });

    } catch (error) {
        console.log("Error in searchUser controller: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function signUp(req, res) {
    try {
        const userInfo = req.body;
        const isSuccess = await authServices.signUp(userInfo);
        
        if(isSuccess){
            res.status(201).json({ message: "User created Successfully" });
        }
        
    } catch (error) {
        console.log("Error in createCustomer controller: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function sendOtp(req, res) {
    try {
        const email = req.body.email;
        const isSent = await authServices.sendOtp(email);

        if (!isSent) {
            return res.status(404).json({ message: "User does not exist." });
        }
        
        res.status(201).json({ message: "OTP sent successfully." });
    
    } catch (error) {
        console.log("Error in sendOTP controller: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function verifyOtp(req, res) {
    try {
        const userCredentials = req.body;
        const otpVerification = await authServices.verifyOtp(userCredentials);

        if (!otpVerification.success) {

            if (otpVerification.attempts >= 5) {
                return res.status(404).json({code: "TOO_MANY_ATTEMPTS" , message: "Too many failed attempts. Please try again later." });
            }
            if (otpVerification.attempts < 5) {
                return res.status(404).json({code: "INCORRECT_OTP" , message: "Incorrect OTP." });
            }

            return res.status(404).json({code: "NOT_FOUND", message: "Invalid OTP" });
        }

        res.cookie("accessToken", otpVerification.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 10 * 60 * 1000
        });

        return res.status(200).json({ code: "OTP_VERIFIED", message: "OTP verified successfully." });

    } catch (error) {
        console.log("Error in verifyUser controller: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function changePassword(req, res) {
    try {
        const userCredentials = {};
        
        userCredentials.email = req.user.userEmail;
        userCredentials.password = req.body.password;
        
        const isSuccess = await authServices.changePassword(userCredentials);

        if (!isSuccess) {
            return res.status(404).json({code: "USER_NOT_FOUND", msg: "User not found." });
        }

        return res.status(200).json({ code: "PASSWORD_UPDATED", message: "Password Updated Successfully." });
    } catch (error) {
        console.log("Error in changePassword controller: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

};