// Collection models
import User from "../models/User.js";
import OTP from "../models/otp.js";

// Services
import { generateLoginToken, generateOtpToken } from "../utils/tokenUtils.js";
import { generateUserId } from "../utils/userUtils.js";
import { generateOtp } from "../utils/otpUtils.js";
import { inputType, setupTransport } from "../utils/authUtils.js";


// Controller to authenticate user for login.
export async function searchUser(userCredentials) {
    try {
        let user;
        
        const isId = inputType(userCredentials.value);
        if (isId) {
            user = await User.findOne({ userId: userCredentials.value });
        }
        else {
            user = await User.findOne({ userEmail: userCredentials.value });
        }
        
        if(!user){
            return {success: false};
        }

        if(user.userPassword !== userCredentials.password){
            return {success: false};
        }

        const token = generateLoginToken(user);
        return { token, success: true };


    } catch (error) {
        console.log("Error in searchUser service: ", error);
        throw new Error(error);
    }
};

export async function signUp(userInfo) {
    try {
        const address = "null";
        const role = "customer";

        const newCustomer = new User(
            {
                userId: generateUserId(role),
                userPassword: userInfo.password,
                userName: userInfo.name,
                userEmail: userInfo.email,
                userContact: userInfo.contact,
                userAddress: address,
                userRole: role
            }
        );

        await newCustomer.save();
        return true;

    } catch (error) {
        console.log("Error in createCustomer service: ", error);
        throw new Error(error);
    }
}

// -------------------------------------------------------------------------------

export async function sendOtp(email) {
    try {
        const user = await User.findOne({ userEmail: email });
        if (!user) {
            return false;
        }

        const otp = await generateOtp(email);

        const transporter = setupTransport();

        await transporter.sendMail({
            from: "ch.ali55122@gmail.com",
            to: email,
            subject: "ComputerWorld",
            text: `Your OTP ${otp}.`
        });

        return true;
    } catch (error) {
        console.log("Error in sendOTP service: ", error);
        throw new Error(error);
    }
}


export async function verifyOtp(userCredentials) {
    try {
        const otp = await OTP.findOne({ userEmail: userCredentials.email });
        if (!otp) {
            return { success: false};
        }

        let attempts = otp.attempts;
        if (otp.OneTimePassword !== userCredentials.inputOtp) {
            
            attempts++;
            
            if (otp.attempts >= 5) {
                await OTP.findOneAndDelete(userCredentials.email);
                return {attempts, success: false};
            }

            await OTP.updateOne({ attempts: attempts });
            return {attempts, success: false};
        }

        if (otp.OneTimePassword === userCredentials.inputOtp) {
            const status = "verified";
            const token = generateOtpToken(userCredentials.email, status);
            return { token, attempts, success: true };
        }
    } catch (error) {
        console.log("Error in verifyUser services: ", error);
        throw new Error(error);
    }
};

export async function changePassword(userCredentials) {
    try {

        const updatedUser = await User.findOneAndUpdate(
            { userEmail: userCredentials.email }, { userPassword: userCredentials.password }, { returnDocument: 'after' }
        );

        if (!updatedUser) {
            return false;
        }
        
        return true;

    } catch (error) {
        console.log("Error in changePassword service: ", error);
        throw new Error(error);
    }

}