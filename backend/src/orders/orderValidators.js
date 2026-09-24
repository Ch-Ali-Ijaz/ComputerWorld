export function isOrderInfoValid(orderInfo){
    if(orderInfo.orderType === "online" && !orderInfo.deliveryAddress){
        throw new Error("Delivery Address is required.");
    }
};

// --------------------------------------------------------------------------
export function isOperationValid(orderInfo){
    if(orderInfo.orderType === "online" && !orderInfo.deliveryAddress){
        throw new Error("Delivery Address is required.");
    }
};