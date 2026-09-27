
export function isUnitUpdateAuthorized(role, newInfo, currentUnits) {

    const employeeCanUpdate = ["currentStatus", "soldPrice"];
    if(role === "admin"){
        return;
    }

    if(role === "employee"){
        if(currentUnits.length > 1){
            throw new Error("Bulk update not allowed for employees.");

        }
        if (!Object.keys(newInfo).every(key => employeeCanUpdate.includes(key))) {
            throw new Error("Field(s) are not allowed to update.");
    
        }
        if(newInfo.soldPrice && currentUnits[0].soldPrice) {
            throw new Error("employees cannot update soldPrice.");
        
        }
    }

};