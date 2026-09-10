export function isItemInputValid(variantId, quantity) {
    if (!variantId) {
        throw new Error("VariantId is required for every Items.");
    }
    if (!quantity) {
        throw new Error("Quantity is required for every Items.");
    }
    if (Number(quantity) <= 0) {
        throw new Error("For every item minimum quantity should be ONE.");
    }

};