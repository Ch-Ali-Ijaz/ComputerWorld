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
        if (userInfo.cnic !== undefined) {
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

        if(!user) {
            return false;
        }
        else{
            return true;
        }

    } catch (error) {
        console.log("Error in createCustomer service: ", error);
        throw new Error(error);
    }
}

// -------------------------------------------------------------------------------
export async function updateUser(objectId, updatedInfo) {
    try {
        const user = await User.findById(objectId);

        roleValidator(updatedInfo.userRole);
        phoneValidator(updatedInfo.userContact);
        if (updatedInfo.userCNIC !== undefined) {
            cnicValidator(updatedInfo.userCNIC);
        }

        const updatedUser = await User.findByIdAndUpdate(
            objectId,
            {
                userId: updatedInfo.userId,
                userPassword: updatedInfo.userPassword,
                userName: updatedInfo.userName,
                userCNIC: updatedInfo.userCNIC,
                userEmail: updatedInfo.userEmail,
                userContact: updatedInfo.userContact,
                userAddress: updatedInfo.userAddress,
                userRole: updatedInfo.userRole
            },
            { returnDocument: "after", runValidators: true }
        );

        if(!updatedUser) {
            return false;
        }
        else {
            return true;
        }

        // const updatedUser = {
        //     userId: user.userId,
        //     userPassword: password,
        //     userName: name,
        //     userCNIC: cnic,
        //     userEmail: email,
        //     userContact: contact,
        //     userAddress: address,
        //     userRole: role
        // };

        // Object.assign(user, updatedUser);
        // const record = await user.save();

    } catch (error) {
        console.log("Error in updateCustomer controller: ", error);
        throw new Error(error);
    }
}

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
