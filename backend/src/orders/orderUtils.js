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

export function setOrderFilter(queries) {
    
    const filter = {};
    if(Object.keys(queries).length === 0) {
        return filter;
    }

    if(queries.objectId) {
        filter._id = queries.objectId;
    }
    if(queries.orderId) {
        filter.orderId = orderId;
    }
    if(queries.orderType) {
        filter.orderType = queries.orderType;
    }
    if(queries.variantId) {
        filter["orderedItems.variantId"] = queries.variantId;
    }
    if(queries.unitId) {
        filter["orderedItems.unitIds"] = queries.unitId;
    }
    if(queries.orderStatus) {
        filter.orderStatus = queries.orderStatus;
    }
    if(queries.paymentMethod) {
        filter.paymentMethod = queries.paymentMethod;
    }
    if(queries.paymentStatus) {
        filter.paymentStatus = queries.paymentStatus;
    }
    if(queries.deliveryAddress) {
        filter.deliveryAddress = {
            $regex: queries.deliveryAddress,
            $options: "i"
        };
    }
    if(queries.minSubTotal || queries.maxSubTotal) {
        filter.subTotal = {};
        if(queries.minSubTotal) {
            filter.subTotal.$gte = Number(queries.minSubTotal);
        }
        if(queries.maxSubTotal) {
            filter.subTotal.$lte = Number(queries.maxSubTotal);
        }
        
    }
    if(queries.minDeliveryFee || queries.maxDeliveryFee) {
        filter.deliveryFee = {};
        if(queries.minDeliveryFee) {
            filter.deliveryFee.$gte = Number(queries.minDeliveryFee);
        }
        if(queries.maxDeliveryFee) {
            filter.deliveryFee.$lte = Number(queries.maxDeliveryFee);
        }
        
    }
    if(queries.minTotalDiscount || queries.maxTotalDiscount) {
        filter.totalDiscount = {};
        if(queries.minTotalDiscount) {
            filter.totalDiscount.$gte = Number(queries.minTotalDiscount);
        }
        if(queries.maxTotalDiscount) {
            filter.totalDiscount.$lte = Number(queries.maxTotalDiscount);
        }
        
    }
    if(queries.minPayableAmount || queries.maxPayableAmount) {
        filter.payableAmount = {};
        if(queries.minPayableAmount) {
            filter.payableAmount.$gte = Number(queries.minPayableAmount);
        }
        if(queries.maxPayableAmount) {
            filter.subTotal.$lte = Number(queries.maxPayableAmount);
        }
        
    }
    
    return filter;
}