import * as variantServices from "../services/variantServices.js";

// Public Functions
export async function isDiscountEligible(discount, userId, item) {

    if(!isDiscountActive(discount.endDate, discount.isActive)) {
        return false;
    }
    if(!isUserEligible(discount.applicableTo, discount.userIds, userId)) {
        return false;
    }
    if(!(await isTargetEligible(discount.targetType, discount.targetIds, item))){
        return false;
    }


    return true;
};

// Private Functions
// ----------------------------------------------------------------------------------
function isDiscountActive(endDate, isActive) {

    const currentDate = new Date();
    const validDiscount = currentDate <= endDate && isActive === true;
    return validDiscount

};

// ----------------------------------------------------------------------------------
function isUserEligible(applicableTo, userIds, userId) {

    if(applicableTo === "All") {
        return true;
    }

    return userIds.includes(userId);
};

// ----------------------------------------------------------------------------------
async function isTargetEligible(targetType, targetIds, item) {

    switch(targetType) {
        case "All":
            return true;
        case "Product":
            const productId = await variantServices.getProductId(item.variantId);
            return isProductEligible(targetIds, productId);
        case "Variant":
            return isVariantEligible(targetIds, item.variantId);
        default: 
        throw new Error("Invalid targetType.");
    }
};

// ----------------------------------------------------------------------------------
function isProductEligible(targetIds, productId) {
    
    return targetIds.some(id => id.toString() === productId.toString());
};

// ----------------------------------------------------------------------------------
function isVariantEligible(targetIds, variantId) {

    return targetIds.some(id => id.toString() === variantId.toString());
};
