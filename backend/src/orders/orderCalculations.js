
export function calculateAmounts(orderedItems, discount, deliveryFee) {
    let subTotal = 0;
    let totalDiscount = 0;
    let payableAmount = 0;
    for (const item of orderedItems) {
        subTotal = subTotal + item.subTotal;
        totalDiscount = totalDiscount + item.discount;
        payableAmount = payableAmount + item.totalPrice;
    }

    payableAmount = payableAmount + deliveryFee - Number(discount);

    if(totalDiscount >= (payableAmount/2)){
        throw new Error("Total discount cannot be greater than 50% of payableAmount");
    }

    return { payableAmount, totalDiscount, subTotal };
};