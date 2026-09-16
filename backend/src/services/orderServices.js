import Order from "../models/Order.js";
import { getAvailableUnits } from "../utils/orderUtils.js";
import * as orderUtils from "../utils/orderUtils.js";

export async function placeOrder(userId, orderInfo) {
    try {
        isOrderInfoValid(orderInfo);
        const orderId = orderUtils.setOrderId(orderInfo.orderType);
        const items = buildItems(orderInfo.sellingPrice, orderInfo.quantity);
        const userIds = orderUtils.resolveOrderActors(userId, orderInfo.orderType);
        const orderStatus = orderUtils.resolveOrderStatus(orderInfo.orderType);
        const paymentStatus = orderUtils.setPaymentStatus(orderInfo.orderType);
        const price = orderUtils.calculatePrices(orderInfo.items, orderInfo.discount);


        const newOrder = new Order({
            orderId: orderId,
            createdBy: userIds.createdBy,
            customerId: userIds.customerId,
            orderType: orderInfo.orderType,
            orderStatus: orderStatus,
            items: items,
            paymentMethod: orderInfo.paymentMethod,
            paymentStatus: paymentStatus,
            subTotal: price.subTotal,
            discount: orderInfo.discount,
            deliveryFee: Number(500),
            totalPrice: price.totalPrice
        })


    } catch (error) {
        // console.log(error);
        throw new Error("Error in PlaceOrder Service.", error.message);
    }
}