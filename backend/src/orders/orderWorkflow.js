import * as placeOrderServices from "./services/placeOrderServices.js";

export async function placeOrder(user, orderInfo) {

    switch(orderInfo.orderType) {
        case "online":
            return await placeOrderServices.onlineOrder(user.userId, orderInfo);
        case "Walk-In":
            return await placeOrderServices.walkInOrder(user, orderInfo);
        default:
            throw new Error("Invalid orderType.");
    }
};