import { customAlphabet } from "nanoid";

import User from "../models/User.js";

const nanoid = customAlphabet("1234567890ABCDEF", 8);

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

export function validateRole(role) {

    const allowedRoles = ["employee", "customer"];
    if (!allowedRoles.includes(role)) {
        return false;
    }
    else {
        return true;
    }
};

export async function filterUser(searchBy, value) {
    try{
        let user = [];

        switch (searchBy) {
            case "id":
                user[0] = await User.findOne({ userId: value });
                break;
    
            case "email":
                user[0] = await User.findOne({ userEmail: value });
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
    }
    catch (error) {
        console.log("Error in filterUser function: ", error);
        throw new Error(error);
    }

};