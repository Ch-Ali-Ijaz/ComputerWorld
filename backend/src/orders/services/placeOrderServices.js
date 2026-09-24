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
    const itemsAfterDiscount = await applyDiscountByCode(orderInfo.discountCode, userId, orderedItems);
    const paymentStatus = "Due";
    const deliveryFee = 1000;
    const amounts = orderCalculations.calculateAmounts(orderedItems, deliveryFee);

    isOrderInfoValid(orderInfo);

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
    const orderType = orderUtils.setOrderType(user.userRole);
    const userIds = orderResolvers.resolveOrderActors(user.userId, orderType);
    const orderStatus = orderResolvers.resolveOrderStatus(orderType);
    const orderedItems = buildItems(orderInfo.cartItems);
    const paymentStatus = orderUtils.setPaymentStatus(orderType);
    const deliveryFee = orderCalculations.calculateDeliveryFee(orderType);
    const amounts = orderCalculations.calculateAmounts(orderedItems, deliveryFee);

    isOrderInfoValid(orderInfo);

    const newOrder = new Order({
        orderId: orderId,
        createdBy: userIds.createdBy,
        customerId: userIds.customerId,
        orderType: orderType,
        orderStatus: orderStatus,
        orderedItems: orderedItems,
        paymentMethod: orderInfo.paymentMethod,
        paymentStatus: paymentStatus,
        subTotal: amounts.subTotal,
        discountedPrice: orderInfo.discountedPrice,
        deliveryAddress: orderInfo.deliveryAddress,
        totalDiscount: amounts.totalDiscount,
        deliveryFee: deliveryFee,
        payableAmount: amounts.payableAmount
    });
};