import * as discountServices from "./discountServices.js"
import * as discountRules from "./discountRules.js"
import { applyDiscountToItem } from "./discountCalculations.js"

export async function updateWorkflow(objectId, data) {
    let updatedDocument;
    switch (data.operation) {

        case "toggleActive":
            updatedDocument = await discountServices.toggleActiveField(objectId);
            break;
        case "updateDocument":
            updatedDocument = await discountServices.updateDiscount(objectId, data);
            break;
        default:
            throw new Error("Invalid operation.");

    }

    return updatedDocument;
};

// ----------------------------------------------------------------------------------
export async function applyDiscountByCode(discountCode, userId, items) {

    if(!discountCode){
        return items;
    }

    const discount = await discountServices.getDiscountByCode(discountCode);
    if (!discount) {
        throw new Error("Discount not found.");
    }

    const updatedItems = [];
    for(const item of items) {
        
        const isEligible = await discountRules.isDiscountEligible(discount, userId, item);
        
        if(isEligible){
            updatedItems.push(applyDiscountToItem(discount, item));
        } else {
            updatedItems.push(item);
        }
    }

    return updatedItems;
};