import * as orderServices from "./orderServices.js";

export async function placeOrder(user, orderInfo) {

    switch(orderInfo.orderType) {
        case "online":
            return await orderServices.onlineOrder(user.userId, orderInfo);
        case "Walk-In":
            return await orderServices.walkInOrder(user, orderInfo);
        default:
            throw new Error("Invalid orderType.");
    }
};

// ------------------------------------------------------------------------------------
export async function updateOrder(user, objectId, newInfo) {
    switch(newInfo.operation) {
        case "updateOrderStatus":
            return await orderServices.updateOrderStatus(user, objectId, newInfo.orderStatus);
        case "acceptForDelivery":
            return await orderServices.acceptForDelivery(user, objectId);
        case "cancelOrder":
            return await orderServices.cancelOrder(user, objectId);
        case "dropItem":
            return await orderServices.dropItem(user, objectId, newInfo.variantId)
        case "paymentPaid":
            return await orderServices.updatePaymentStatus(user, objectId);
        case "updateAddress":
            return await orderServices.updateAddress(user, objectId, newInfo.deliveryAddress);
        default:
            throw new Error("Invalid Operation.");
    }
}