import Order from "./orderModel.js";
import * as orderUtils from "./orderUtils.js";
import * as orderCalculations from "./orderCalculations.js";
import { buildItems } from "../services/shared/itemsBuilder.js";
// import orderValidator from "./orderValidators.js";
import { applyDiscountByCode } from "../discounts/discountWorkflows.js";

export async function getOrders(queries) {

    const filter = orderUtils.setOrderFilter(queries);
    return await Order.find(filter);
};

// -----------------------------------------------------------------------------------------------------
export async function onlineOrder(userId, orderInfo) {

    const orderId = orderUtils.setOrderId();
    const orderType = "online";
    const customerId = userId;
    const orderStatus = "In-Progress";
    const orderedItems = await buildItems(orderInfo.cartItems);
    const discount = 0;
    const itemsAfterDiscount = await applyDiscountByCode(orderInfo.discountCode, userId, orderedItems);
    const paymentStatus = "Due";
    const deliveryFee = 1000;
    const amounts = orderCalculations.calculateAmounts(orderedItems, discount, deliveryFee);

    const newOrder = new Order({
        orderId: orderId,
        customerId: customerId,
        orderType: orderType,
        orderStatus: orderStatus,
        orderedItems: itemsAfterDiscount,
        paymentMethod: orderInfo.paymentMethod,
        paymentStatus: paymentStatus,
        subTotal: amounts.subTotal,
        deliveryAddress: orderInfo.deliveryAddress,
        totalDiscount: amounts.totalDiscount,
        deliveryFee: deliveryFee,
        payableAmount: amounts.payableAmount
    });

    return await newOrder.save();
};

// -----------------------------------------------------------------------------------------------------
export async function walkInOrder(user, orderInfo) {

    const orderId = orderUtils.setOrderId();
    const orderType = "Walk-In"
    const orderStatus = "Completed";
    const createdBy = user.userId;
    const orderedItems = await buildItems(orderInfo.cartItems);
    const paymentStatus = "Paid";
    const deliveryFee = 0;
    const amounts = orderCalculations.calculateAmounts(orderedItems, orderInfo.discount, deliveryFee);
    
    const newOrder = new Order({
        orderId: orderId,
        createdBy: createdBy,
        orderType: orderType,
        orderStatus: orderStatus,
        orderedItems: orderedItems,
        paymentMethod: orderInfo.paymentMethod,
        paymentStatus: paymentStatus,
        subTotal: amounts.subTotal,
        totalDiscount: orderInfo.discount,
        payableAmount: amounts.payableAmount
    });

    return await newOrder.save();
};

// -----------------------------------------------------------------------------------------------------
export async function updateOrderStatus(user, objectId, newStatus) {
    
    const updatedOrder = {
        orderStatus: newStatus
    };

    return await Order.findByIdAndUpdate(objectId, updatedOrder, {returnDocument: "after"});
};

// -----------------------------------------------------------------------------------------------------
export async function acceptForDelivery(user, objectId) {
    
    const updatedOrder = {
        deliveryPersonId: user.userId,
        orderStatus: "On-The-Way"
    };

    return await Order.findByIdAndUpdate(objectId, updatedOrder, {returnDocument: "after"});
};

// -----------------------------------------------------------------------------------------------------
export async function cancelOrder(user, objectId) {

    const updatedOrder = {
        orderStatus: "Canceled"
    };

    return await Order.findByIdAndUpdate(objectId, updatedOrder, {returnDocument: "after"});
};

// -----------------------------------------------------------------------------------------------------
export async function updatePaymentStatus(user, objectId) {

    const updatedOrder = {
        paymentStatus: "Paid",
    }

    return await Order.findByIdAndUpdate(
        objectId,
        updatedOrder,
        {returnDocument: "after"}
    );
};
// -----------------------------------------------------------------------------------------------------
export async function updateAddress(user, objectId, newAddress) {

    const updatedOrder = {
        deliveryAddress: newAddress,
    }

    return await Order.findByIdAndUpdate(
        objectId,
        updatedOrder,
        {returnDocument: "after"}
    );
};

// -----------------------------------------------------------------------------------------------------
export async function deleteOrder(objectId) {

    return await Order.findByIdAndDelete(objectId);
};