import { getAvailableUnitIds } from "../inventoryUnitServices.js";
import { getSellingPrice } from "../variantServices.js";

function calculatePrices(unitPrice, quantity) {
    const discount = 0;
    const subTotal = unitPrice * quantity;
    const totalPrice = subTotal;
    return {subTotal, totalPrice, discount};
};

// ----------------------------------------------------
async function buildItem(item) {
    try {
        const unitIds = await getAvailableUnitIds(item.variantId, item.quantity);
        const unitPrice = await getSellingPrice(item.variantId);
        const prices = calculatePrices(unitPrice, item.quantity);
        return {
            variantId: item.variantId,
            unitIds,
            quantity: item.quantity,
            unitPrice,
            subTotal: prices.subTotal,
            discount: prices.discount,
            totalPrice: prices.totalPrice
        }
    } catch (error) {
        throw new Error(error);
    }
}

// ----------------------------------------------------
export async function buildItems(cartItems) {
    try {
        if(cartItems.length <= 0){
            throw new Error("Cart is empty.");
        }

        const orderedItems = [];
        for (const item of cartItems) {
            const orderedItem = await buildItem(item);
            orderedItems.push(orderedItem);
        }

        return orderedItems;

    } catch (error) {
        throw new Error(error);
    }
};