export function isOrderInfoValid(orderType, orderInfo){
    if(orderType === "online" && !orderInfo.deliveryAddress){
        throw new Error("Delivery Address is required.");
    }
};