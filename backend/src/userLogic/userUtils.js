import { customAlphabet } from "nanoid";
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
};

// ----------------------------------------------------------------
export function setFilterObject(queries) {
    const filter = {};

    if(Object.keys(queries).lenght === 0){
        return filter;
    }
    if(queries.objectId){
        filter._id = queries.objectId;
    }
    if(queries.userId){
        filter.userId = queries.userId;
    }
    if(queries.email){
        filter.userEmail = queries.email
    }
    if(queries.name){
        filter.userName = {
            $regex: queries.name,
            $options: "i"
        };
    }
    if(queries.role){
        filter.userRole = queries.role;
    }
    if(queries.status){
        filter.userStatus = queries.status;
    }
    if(queries.cnic) {
        filter.userCNIC = queries.cnic;
    }
    if(queries.contact){
        filter.userContact = queries.contact;
    }
    return filter;

};