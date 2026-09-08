
export function isUnitInfoValid(newInfo, currentInfo) {

    for(let i = 0; i < currentInfo.length; i++){
        const isSold = currentInfo[i].currentStatus === "Sold" || newInfo.currentStatus === "Sold";
        if(newInfo.soldPrice && !isSold){
            throw new Error("Cannot set soldPrice for unsold units.");
    
        }
        if(currentInfo[i].currentStatus === "Sold" && newInfo.currentStatus === "Sold"){
            throw new Error("status is already sold.");
        }
        if(currentInfo[i].currentStatus === "Sold" && newInfo.currentStatus){
            throw new Error("Cannot update status of sold units.");
        }

    }

    if(newInfo.purchaseCost < 0 || newInfo.sellingPrice < 0){
        throw new Error("Prices cannot be negative.");
    }
    if(newInfo.currentStatus === "Defective" && !newInfo.defectId){
        throw new Error("Defect Id is required for Defective units.");
    }
    if(newInfo.dwStartDate && !newInfo.numOfDays){
        throw new Error("Number of days are required for dealer warranty.");
    }
    if(!newInfo.dwStartDate && newInfo.numOfDays){
        throw new Error("Dealer warranty start date is required.");
    }

};

// ---------------------------------------------------------------------------------
export function isSaleInfoValid(saleInfo) {
    for(let i = 0; i < saleInfo.length; i++){
        if(!saleInfo[i].soldPrice){
            throw new Error("Sold Price is required to sell units.");
        }
        if(saleInfo[i].soldPrice < 0){
            throw new Error("Sold Price cannot be negative.");
        }

    }
}