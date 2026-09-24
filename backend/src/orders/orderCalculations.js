
export function calculateAmounts(orderedItems, deliveryFee) {
    let subTotal = 0;
    let payableAmount = 0;
    for (const item of orderedItems) {
        subTotal = subTotal + item.subTotal;
        payableAmount = payableAmount + item.totalPrice;
    }

    const totalDiscount = subTotal - payableAmount;
    payableAmount = payableAmount + deliveryFee;
    if(totalDiscount >= (payableAmount/2)){
        throw new Error("Total discount cannot be greater than 50% of payableAmount");
    }

    return { payableAmount, totalDiscount, subTotal };
};