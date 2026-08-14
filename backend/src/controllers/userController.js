import User from "../models/User.js"
import * as userServices from "../services/userServices.js"

// ---------------------------------------------------------------------------
export async function getAllUsers(req, res) {
    try {

        const filterQuery = req.query;
        const users = await userServices.getAllUsers(filterQuery);

        if(users.length === 0 || users[0] === null) {
            return res.status(404).json({ message: "No users found." });
        }
        else{

            return res.status(200).json(users);
        }

    } catch (error) {
        console.log("Error in getAllUsers controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// --------------------------------------------------------------------------
export async function getUser(req, res) {
    try {
        const id = req.params.id;
        const user = await userServices.getUser(id);
        
        if (!user) {
            return res.status(404).json({ message: "User not Found." })
        }
        else{
            return res.status(200).json(user);
        }

    } catch (error) {
        console.log("Error in getCustomer controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// ---------------------------------------------------------------------------
export async function createUser(req, res) {
    try {
        const { password, name, email, contact, address, role } = req.body;
        const userInfo = req.body;
        
        const newUser = await userServices.createUser(userInfo);

        if(!newUser) {
            return res.status(400).json({ message: "User creation failed." });
        }
        else{
            res.status(200).json({ message: "User created Successfully"});
        }
        
    } catch (error) {
        console.log("Error in createCustomer controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// ---------------------------------------------------------------------------
// export async function updateUser(req, res) {
//     // res.status(200).send("Here you can update the existing users.");
//     try {
//         // Checking if User Exists.
//         const id = req.params.id;
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         // Getting data to Update User record.
//         const { password, name, email, contact, address, role } = req.body;
//         let cnic = req.body.cnic;

//         // Validating role.
//         const isRoleValid = validateRole(role);
//         if (isRoleValid != true) {
//             return res.status(400).json({ msg: "Role is not allowed." });
//         }
        
//         const updatedUser = {
//             userId: user.userId,
//             userPassword: password,
//             userName: name,
//             userCNIC: cnic,
//             userEmail: email,
//             userContact: contact,
//             userAddress: address,
//             userRole: role
//         };

//         // Saving the changes.
//         Object.assign(user, updatedUser);
//         const record =  await user.save();
//         res.status(200).json({ message: "User Updated Successfully."});

//     } catch (error) {
//         console.log("Error in updateCustomer controller: ", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// ---------------------------------------------------------------------------
// export async function deleteUser(req, res) {
//     // res.status(200).send("Here you can delete users.");
//     try {

//         const deletedRecord = await User.findByIdAndDelete(req.params.id);

//         if (!deletedRecord) {
//             return res.status(404).json({ message: "Record not found." });
//         }

//         res.status(200).json(deletedRecord);
//     } catch (error) {
//         console.log("Error in deleteCustomer controller: ", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }
