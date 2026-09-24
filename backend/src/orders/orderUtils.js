import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("123456789", 6);

// -----------------------------------------------------
export function setOrderId() {
    return "ODR" + `-` + nanoid();
};

// -----------------------------------------------------
export function setOrderType(role) {
    let orderType;
    switch (role) {
        case "customer":
            orderType = "Walk-In";
            break;
        case "employee":
            orderType = "online";
            break;
        case "admin":
            orderType = "Walk-In";
            break;
        default:
            throw new Error("Invalid userRole.");
    }

    return orderType;
};

// -----------------------------------------------------
export function setPaymentStatus(orderType) {
    let paymentStatus;
    switch (orderType) {
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