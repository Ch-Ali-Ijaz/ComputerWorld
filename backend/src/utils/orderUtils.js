import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("123456789", 6);

export function setOrderId(orderType){
    let prefix;
    if(orderType === "Walk-In"){
        prefix = "EMP";
    }
    if(orderType === "online"){
        prefix = "CUST";
    }

    return prefix + `-` + nanoid;
};

// -----------------------------------------------------
export function resolveOrderActors(userId, orderType){
    const users = {};
    switch(orderType){
        case "Walk-In":
            users.createdBy = userId;
            users.customerId = null;
            break;
        case "online":
            users.createdBy = null;
            users.customerId = userId;
            break;
        default:
            throw new Error("Invalid orderType.");

    }

    return users;
};

// -----------------------------------------------------
export function resolveOrderStatus(orderType){
    let orderStatus;
    switch(orderType){
        case "Walk-In":
            orderStatus = "Completed";
            break;
        case "online":
            orderStatus = "In-Progress";
            break;
        default:
            throw new Error("Invalid orderType.");

    }

    return orderStatus;
};

// -----------------------------------------------------
export function setPaymentStatus(orderType){
    let paymentStatus;
    switch(orderType){
        case "Walk-In":
            paymentStatus = "Paid";
            break;
        case "online":
            paymentStatus = "Due";
            break;
        default:
            throw new Error("Invalid orderType.");

    }

    return paymentStatus;
};

// -----------------------------------------------------
export function calculatePrices(items, discount){
    const prices = {};
    for(let i = 0; i < items.length; i++){
        
    }
}