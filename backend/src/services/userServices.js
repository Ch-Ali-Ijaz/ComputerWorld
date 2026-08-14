import User from "../models/User.js"
import { generateUserId, filterUser } from "../utils/userUtils.js"
import { roleValidator, cnicValidator, phoneValidator } from "../validators/userValidator.js"

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
export async function getUser(id) {
    try {
        
        const user = await User.findById(id);
        return user;

    } catch (error) {
        console.log("Error in getCustomer service: ", error);
        throw new Error(error);
    }
}

// -------------------------------------------------------------------------------
export async function createUser(userInfo) {
    try {

        roleValidator(userInfo.role);
        phoneValidator(userInfo.contact);
        if(userInfo.cnic !== undefined) {
            cnicValidator(userInfo.cnic);
        }

        const id = generateUserId(userInfo.role);
        
        const newUser = new User(
            {
                userId: id,
                userPassword: userInfo.password,
                userName: userInfo.name,
                userCNIC: userInfo.cnic,
                userEmail: userInfo.email,
                userContact: userInfo.contact,
                userAddress: userInfo.address,
                userRole: userInfo.role
            }
        );

        const user = await newUser.save();
        return user;

    } catch (error) {
        console.log("Error in createCustomer service: ", error);
        throw new Error(error);
    }
}

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

// -------------------------------------------------------------------------------
export async function deleteUser(recordId) {
    try {

        const deletedRecord = await User.findByIdAndDelete(recordId);

        return deletedRecord;

    } catch (error) {
        console.log("Error in deleteCustomer service: ", error);
        throw new Error(error);
    }
}
