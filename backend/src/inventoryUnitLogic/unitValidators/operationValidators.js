export function isBulkUpdateValid(newInfo) {
    const bulkUpdatabelFields = ["purchaseCost", "sellingPrice", "dwStartDate", "numOfDays"];

    if(!Object.keys(newInfo).every(key => bulkUpdatabelFields.includes(key))){
        throw new Error("Invalid bulk update for given data.");
        
    }
};

export function isSaleValid(units, items) {

    if(units.length != items.length){
        throw new Error("Some units not found for sale.");
    }

    for(let i = 0; i < units.length; i++){
        if(units[i].currentStatus != "Available"){
            throw new Error("Cannot sell unit(s) that is/are not available.");
        }
    }


};