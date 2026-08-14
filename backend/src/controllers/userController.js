import User from "../models/User.js"
import * as userServices from "../services/userServices.js"

// ---------------------------------------------------------------------------
export async function getAllUsers(req, res) {
    try {

        const filterQuery = req.query;
        const users = await userServices.getAllUsers(filterQuery);

        if(users.length === 0 || users[0] === null) {
            return res.status(404).json({ code: "NOT_FOUND", message: "No users found." });
        }
        else{

            return res.status(200).json({ code: "SUCCESS", users });
        }

    } catch (error) {
        console.log("Error in getAllUsers controller: ", error);
        res.status(500).json({code: "ERROR", message: "Internal Server Error" });
    }
}

// --------------------------------------------------------------------------
export async function getUser(req, res) {
    try {
        const id = req.params.id;
        const user = await userServices.getUser(id);
        
        if (!user) {
            return res.status(404).json({code: "NOT_FOUND", message: "User not Found." })
        }
        else{
            return res.status(200).json({ code: "SUCCESS", user });
        }

    } catch (error) {
        console.log("Error in getCustomer controller: ", error);
        res.status(500).json({ code: "ERROR", message: "Internal Server Error" });
    }
}

// ---------------------------------------------------------------------------
export async function createUser(req, res) {
    try {
        const { password, name, email, contact, address, role } = req.body;
        const userInfo = req.body;
        
        const isSuccess = await userServices.createUser(userInfo);

        if(!isSuccess) {
            return res.status(400).json({ code: "CREATE_FAILED", message: "User creation failed." });
        }
        else{
            res.status(200).json({ code: "CREATE_SUCCESS", message: "User created Successfully" });
        }
        
    } catch (error) {
        console.log("Error in createCustomer controller: ", error);
        res.status(500).json({ code: "ERROR", message: "Internal Server Error" });
    }
}

// ---------------------------------------------------------------------------
export async function updateUser(req, res) {
    try {
        
        const objectId = req.params.id;
        const updatedInfo = req.body;

        const isSuccess = await userServices.updateUser(objectId, updatedInfo);
        if(!isSuccess){
            return res.status(400).json({ code: "UPDATE_FAILED", message: "User update failed." });
        }
        else{
            return res.status(200).json({ code: "UPDATE_SUCCESS", message: "User Updated Successfully."});
        }

    } catch (error) {
        console.log("Error in updateCustomer controller: ", error);
        return res.status(500).json({ code: "ERROR", message: "Internal Server Error" });
    }
}

// ---------------------------------------------------------------------------
export async function deleteUser(req, res) {
    // res.status(200).send("Here you can delete users.");
    try {
        const recordId = req.params.id;
        const isSuccess = await userServices.deleteUser(recordId);

        if (!isSuccess) {
            return res.status(404).json({ code: "DELETE_FAILED", message: "Record not found." });
        }
        else{
            res.status(200).json({ code: "DELETE_SUCCESS", message: "User deleted successfully." });
        }

    } catch (error) {
        console.log("Error in deleteCustomer controller: ", error);
        res.status(500).json({ code: "ERROR", message: "Internal Server Error" });
    }
}