// Libraries
import { customAlphabet } from "nanoid";

// Models
import User from "../models/User.js";

const nanoid = customAlphabet("1234567890ABCDEF", 8);

// function to generate user Id
export function generateUserId(role) {
    let prefix;
    switch (role) {
        case "admin":
            prefix = "ADM";
            break;
        case "employee":
            prefix = "EMP";
            break;
        case "customer":
            prefix = "CUST";
            break;
        default:
            throw new Error("Invalid role provided");
    }
    return prefix + nanoid();
}

// function to validate the role is allowed or not.
export function validateRole(role) {

    const allowedRoles = ["employee", "customer"];
    if (!allowedRoles.includes(role)) {
        return false;
    }
    else {
        return true;
    }
};

// Function to find User.
export async function findUser(searchBy, value) {

    let user;

    switch (searchBy) {
        case "id":
            user = await User.findOne({ userId: value });
            break;

        case "email":
            user = await User.findOne({ userEmail: value });
            break;

        case "name":
            user = await User.find({
                userName: { $regex: value, $options: "i" }
            });
            break;

        case "role":
            user = await User.find({ userRole: value });
            break;

        case "cnic":
            user = await User.findOne({ userCNIC: value });
            break;

        default:
            throw new Error("Invalid Search."); 
    }

    return user;

};