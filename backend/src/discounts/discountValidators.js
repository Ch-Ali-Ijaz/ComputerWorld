
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
    
}