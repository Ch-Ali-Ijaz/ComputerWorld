import User from "../models/User.js"
import { generateUserId, filterUser } from "../utils/userUtils.js"
import { roleValidator } from "../validators/userValidator.js"

// -------------------------------------------------------------------------------
export async function getAllUsers(filterQuery) {
    try {
        let users;

        if (Object.keys(filterQuery).length === 0) {
            users = await User.find();
        }
        else {
            users = await filterUser(filterQuery.searchBy, filterQuery.value);
        }

        return users;

    } catch (error) {
        console.log("Error in getAllCustomers service: ", error);
        throw new Error(error);
    }
};

// // -------------------------------------------------------------------------------
// export async function getUser(req, res) {
//     try {
//         const id = req.params.id;
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: "User not Found." })
//         }

//         return res.status(200).json(user);

//     } catch (error) {
//         console.log("Error in getCustomer controller: ", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// // -------------------------------------------------------------------------------
// export async function createUser(req, res) {
//     try {
//         const { password, name, email, contact, address, role } = req.body;
//         let cnic = req.body.cnic;

//         const isRoleValid = validateRole(role);
//         if (isRoleValid != true) {
//             return res.status(400).json({ msg: "Role is not allowed." });
//         }

//         const id = generateUserId(role);
        
//         const newUser = new User(
//             {
//                 userId: id,
//                 userPassword: password,
//                 userName: name,
//                 userCNIC: cnic,
//                 userEmail: email,
//                 userContact: contact,
//                 userAddress: address,
//                 userRole: role
//             }
//         );

//         const createdUser = await newUser.save();
//         res.status(200).json({ message: "User created Successfully", createdUser });
//     } catch (error) {
//         console.log("Error in createCustomer controller: ", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// // -------------------------------------------------------------------------------
// export async function updateUser(req, res) {
//     try {
//         // Checking if User Exists.
//         const id = req.params.id;
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         const { password, name, email, contact, address, role } = req.body;
//         let cnic = req.body.cnic;

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

//         Object.assign(user, updatedUser);
//         const record =  await user.save();
//         res.status(200).json({ message: "User Updated Successfully."});

//     } catch (error) {
//         console.log("Error in updateCustomer controller: ", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// // -------------------------------------------------------------------------------
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
