function calculateTotalPrice(unitPrice, quantity){
    return unitPrice * quantity;
};

// ----------------------------------------------------
function buildItem({variantId, quantity, unitPrice}){
    return {
        variantId,
        quantity
    }
}

// ----------------------------------------------------
export function buildItems(items){

};