import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("123456789", 6);

export function generateCartId(role) {
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
            throw new Error("User identification failed for Cart.");
    }
    const randomNumber = nanoid();
    const cartId = `${prefix}-${randomNumber}`;
    return cartId;
};

// ------------------------------------------------------------------------
export function setFilterObject(queries){
    const filter = {};

    if(Object.keys(queries).length === 0){
        return filter;
    }

    if(queries.objectId){
        filter._id = queries.objectId;
    }
    if(queries.userId){
        filter.userId = queries.userId;
    }

    return filter;
};