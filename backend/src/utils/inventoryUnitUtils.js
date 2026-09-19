import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 4);

export function setUnitId(quantity) {
    const uniqueSuffix = nanoid();
    let count = 1;
    let unitIds = [];

    for (let i = 0; i < quantity; i++) {
        unitIds[i] = "IU" + `-` + uniqueSuffix + `-` + 0 + count;
        count++;
    }

    return unitIds;
};

// ---------------------------------------------------------
export function setFilterObject(queries) {
    const filter = {};

    if (Object.keys(queries).length === 0) {
        return filter;
    }

    if (queries.objectId) {
        filter._id = queries.objectId;
    }
    if (queries.unitId) {
        filter.unitId = queries.unitId;
    }
    if (queries.variantId) {
        filter.variant_Id = queries.variantId;
    }
    if (queries.defectId) {
        filter.defect_Id = queries.defectId;
    }
    if (queries.dealerId) {
        filter.dealer_Id = queries.dealerId;
    }
    if (queries.dealerWarrantySD) {
        filter["dealerWarranty.startDate"] = {
            $gte: new Date(queries.dealerWarrantySD)
        };
    }
    if (queries.dealerWarrantyED) {
        filter["dealerWarranty.endDate"] = {
            $lte: new Date(queries.dealerWarrantyED)
        };
    }
    if (queries.customerWarrantySD) {
        filter["customerWarranty.startDate"] = {
            $gte: new Date(queries.customerWarrantySD)
        };
    }
    if (queries.customerWarrantyED) {
        filter["customerWarranty.endDate"] = {
            $lte: new Date(queries.customerWarrantyED)
        };
    }
    if (queries.currentStatus) {
        filter.currentStatus = queries.currentStatus;
    }
    if (queries.minPurchaseCost || queries.maxPurchaseCost) {
        filter.purchaseCost = {};

        if (queries.minPurchaseCost) {
            filter.purchaseCost.$gte = Number(queries.minPurchaseCost);
        }
        if (queries.maxPurchaseCost) {
            filter.purchaseCost.$lte = Number(queries.maxPurchaseCost);
        }
    }
    if (queries.minSoldPrice || queries.maxSoldPrice) {
        filter.soldPrice = {};

        if (queries.minSoldPrice) {
            filter.soldPrice.$gte = Number(queries.minSoldPrice);
        }
        if (queries.maxSoldPrice) {
            filter.soldPrice.$lte = Number(queries.maxSoldPrice);
        }
    }

    return filter;
};

// ---------------------------------------------------------
export function setCustomerWarranty(newStatus) {

    if (newStatus && newStatus !== "Sold") {
        return;
    }

    let startDate, endDate;

    startDate = Date();
    endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);
    return { startDate, endDate };
};

// ---------------------------------------------------------
export function setDealerWarranty(startDate, numOfDays) {
    if (!startDate && !numOfDays) {
        return;
    }

    let endDate;
    endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Number(numOfDays));
    return { startDate, endDate };
};
