import { getAvailableUnitIds } from "../inventoryUnitServices";
import { getSellingPrice } from "../variantServices";

function calculatePrices(unitPrice, quantity, discount) {
    const subTotal = unitPrice * quantity;
};

// ----------------------------------------------------
async function buildItem(item) {
    try {
        const unitIds = await getAvailableUnitIds(item.variantId, item.quantity);
        const unitPrice = await getSellingPrice(item.variantId);
        const prices = calculatePrices(unitPrice, item.quantity, item.discountedPrice);
        return {
            variantId: item.variantId,
            unitIds,
            quantity: item.quantity,
            unitPrice,
            subTotal: prices.subTotal,
            discountedPrice: item.discountedPrice,
            totalPrice: prices.totalPrice
        }
    } catch (error) {
        throw new Error(error);
    }
}

// ----------------------------------------------------
export function buildItems(cartItems) {
    try {
        if(cartItems.length <= 0){
            throw new Error("Cart is empty.");
        }

        const orderedItems = [];
        for (const item of cartItems) {
            const orderedItem = buildItem(item);
            orderedItems.push(orderedItem);
        }

        return orderedItems;

    } catch (error) {
        throw new Error(error);
    }
};