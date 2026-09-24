
export function applyDiscountToItem(discount, item) {
    switch(discount.discountType) {
        case "fixed":
            return calculateDiscountByFixed(discount, item);
        case "percentage":
            return calculateDiscountByPercentage(discount, item);
    }
};

export function calculateDiscount(discount, item) {

    switch(discount.discountType) {
        case "fixed":
            item.totalPrice = (item.unitPrice - discount.value) * item.quantity;
            break;
        case "percentage":
            item.totalPrice = ((discount.value/100) * item.unitPrice) * item.quantity;
            break;
    }

    return item;
};

// Local Services
// -------------------------------------------------------------------------
function calculateDiscountByFixed(discount, item) {
    item.totalPrice = (item.unitPrice - discount.value) * item.quantity;
    item.discount = item.subTotal - item.totalPrice;
    return item;
};

// -------------------------------------------------------------------------
function calculateDiscountByPercentage(discount, item) {

    const applicableDiscount = (discount.value/100) * item.unitPrice;
    item.totalPrice = (item.unitPrice - applicableDiscount) *  item.quantity;
    item.discount = item.subTotal - item.totalPrice;
    return item;
};