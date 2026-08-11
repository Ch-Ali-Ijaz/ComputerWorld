// Collection models
import User from "../models/User.js";
import OTP from "../models/otp.js";

// Services
import { generateLoginToken, generateOtpToken } from "../services/tokenServices.js";
import { generateUserId } from "../services/userServices.js";
import { generateOtp } from "../services/OtpServices.js";
import { inputType, setupTransport } from "../services/authServices.js";


// Controller to authenticate user for login.
export async function searchUser(req, res) {
    try {
        let user;
        const { value, password } = req.body;

        // Checking Input type
        const isId = inputType(value)
        if (isId) {
            user = await User.findOne({ userId: value });
        }
        else {
            user = await User.findOne({ userEmail: value });
        }

        // Checking if User exists
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }

        // Verifying the password.
        if (password !== user.userPassword) {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }

        // Genarating the login token
        const token = generateLoginToken(user);
        return res.status(200).json({ token, role: user.usrRole });

    } catch (error) {
        console.log("Error in searchUser controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to SignUp new customers.
export async function signUp(req, res) {
    try {
        const { password, name, contact, gmail } = req.body;
        const address = "null";
        const role = "customer";

        const newCustomer = new User(
            {
                userId: generateUserId(role),
                userPassword: password,
                userName: name,
                userEmail: gmail,
                userContact: contact,
                userAddress: address,
                userRole: role
            }
        );

        await newCustomer.save();
        res.status(201).json({ message: "User created Successfully" });
    } catch (error) {
        console.log("Error in createCustomer controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Controller to send OTP.
export async function sendOtp(req, res) {
    try {
        const email = req.body.email;
        const user = await User.findOne({ userEmail: email });
        if (!user) {
            return res.status(401).json({ msg: "User not found." });
        }

        const otp = await generateOtp(email);             // Generating Otp

        const transporter = setupTransport();            // Setting up the transport for gmail service.

        await transporter.sendMail({
            from: "ch.ali55122@gmail.com",
            to: email,
            subject: "ComputerWorld",
            text: `Your OTP ${otp}.`
        });

        res.status(201).json({ message: "OTP sent successfully." });
    } catch (error) {
        console.log("Error in sendOTP controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Controller to verify user otp.
export async function verifyUserOtp(req, res) {
    try {
        const { email, inputOtp } = req.body;
        const otp = await OTP.findOne({ userEmail: email });
        if (!otp) {
            return res.status(404).json({ msg: "OTP not found." });
        }

        let attempts = otp.attempts;
        if (otp.OneTimePassword !== inputOtp) {
            if (otp.attempts >= 5) {
                await OTP.findOneAndDelete(email);
                return res.status(429).json({ msg: "Too many attempts. Please Click resend OTP" });
            }

            attempts++;
            await OTP.updateOne({ attempts: attempts });
            return res.status(404).json({ msg: "Incorrect OTP." });
        }


        if (otp.OneTimePassword === inputOtp) {
            const status = "verified";
            const token = generateOtpToken(email, status);
            res.status(200).json({ token, verification: status });
        }
    } catch (error) {
        console.log("Error in verifyUser controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Controller to change password.
export async function changePassword(req, res) {
    try {
        const email = req.user.userEmail;
        const password = req.body.password;

        const updatedUser = await User.findOneAndUpdate({ userEmail: email }, { userPassword: password }, { returnDocument: 'after' });
        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found." });
        }
        res.status(200).json({ msg: "Password Updated Successfully." });
    } catch (error) {
        console.log("Error in changePassword controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}