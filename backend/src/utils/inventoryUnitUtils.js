import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 4);

export function setUnitId(quantity){
    const uniqueSuffix = nanoid();
    let count = 1;
    let unitIds = [];

    for(let i = 0; i < quantity; i++){
        unitIds[i] = "IU" + `-` + uniqueSuffix + `-` + 0 + count;
        count++;
    }

    return unitIds;
};

// ---------------------------------------------------------
export function setFilterObject(queries) {
    const filter = {};

    if(Object.keys(queries).length === 0){
        return filter;
    }

    if (queries.unitId) {
        filter.unitId = queries.unitId;
    }
    if (queries.variantId) {
        filter.variant_Id = queries.variantId;
    }
    if (queries.defectId) {
        filter["unitDefect.defectId"] = queries.defectId;
    }
    if (queries.defectDescription) {
        filter["unitDefect.defectDescription"] = {
            $regex: queries.defectDescription,
            $options: "i"
        }
    }
    if (queries.warrantyStatus) {
        filter.warranty.status = queries.warrantyStatus;
    }
    if (queries.warrantyStartDate) {
        filter["warranty.startDate"] = {
            $gte: new Date(queries.warrantyStartDate)
        };
    }
    if (queries.warrantyEndDate) {
        filter["warranty.endDate"] = {
            $lte: new Date(queries.warrantyEndDate)
        };
    }
    if (queries.currentStatus) {
        filter.currentStatus = queries.currentStatus;
    }
    if (queries.minPrice || queries.maxPrice) {
        filter.price = {};

        if (minPrice) {
            filter.price.$gte = Number(queries.minPrice);
        }
        if (maxPrice) {
            filter.price.$lte = Number(queries.maxPrice);
        }
    }

    return filter;
};

export function updateDates(unitStatus) {
    let startDate, endDate;
    if(unitStatus === "Sold"){
        startDate = new Date.now();
        endDate = endDate.setDate(startDate.getDate() + 7);
        return { startDate, endDate };
    }else{
        return;
    }
};