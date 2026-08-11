import validator from "validator";
import nodemailer from "nodemailer";


// Function to check if input is id or email.
export function inputType(value) {

    if (validator.isEmail(value)) {
        if (value.endsWith("@gmail.com")) {
            return false;
        }
    }
    else {
        return true;
    }

}

// Function to setup tranport to send email.
export function setupTransport() {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    });

    return transporter;
}


