import Order from "../orderModel.js";
import * as orderUtils from "../orderUtils.js";
import * as orderCalculations from "../orderCalculations.js";
import { buildItems } from "../../services/shared/itemsBuilder.js";
import { isOrderInfoValid } from "../orderValidators.js";
import { applyDiscountByCode } from "../../discounts/discountWorkflows.js";

export async function onlineOrder(userId, orderInfo) {

    isOrderInfoValid(orderInfo);
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