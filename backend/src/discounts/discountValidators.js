
export function isDiscountInputValid(discountInfo) {
    if(Object.keys(discountInfo).length === 0){
        throw new Error("No info provided.");
    }
    if(discountInfo.targetType != "All" && !discountInfo.targetCriteria){
        throw new Error("TargetCriteria is required.");
    }
    if(discountInfo.applicableTo != "All" && !discountInfo.userCriteria){
        throw new Error("userCriteria is required.");
    }
    
};

// ------------------------------------------------------------------------------
export function isDiscountQueryValid(queries){
    if(Object.keys(queries).length === 0) {
        return;
    }

    const allowedQueries = [
        "objectId", "discountId", "discountCode", "name", "description", "targetType", "targetId", "applicableTo",
        "userId", "discountType", "value", "discountSD", "discountED", "maxQuantity", "isActive"
    ];

    if(!Object.keys(queries).every(key => allowedQueries.includes(key))){
        throw new Error("Invalid Queries.");
    }
};