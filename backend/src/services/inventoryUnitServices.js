import InventoryUnit from "../models/InventoryUnit.js";

import { setUnitId, setFilterObject, setCustomerWarranty, setDealerWarranty } from "../utils/inventoryUnitUtils.js"
import { isUnitInfoValid, isSaleInfoValid } from "../validators/inputValidators.js";
import { isBulkUpdateValid, isSaleValid } from "../validators/unitValidators.js";
import { isUnitUpdateAuthorized } from "../validators/authorityValidators.js";

export async function getUnits(queries) {
    try {
        const filter = setFilterObject(queries);
        return await InventoryUnit.find(filter);

    } catch (error) {
        console.log("Error in getAllUnits service: ", error);
        throw new Error(error);
    }
};

// -------------------------------------------------------------------------
export async function createUnit(quantity, unitInfo) {
    try {
        isUnitInfoValid(unitInfo, []);
        let units = [];
        const unitIds = setUnitId(quantity);

        const dealerWarranty = setDealerWarranty(unitInfo.dwStartDate, unitInfo.numOfDays);

        for (let i = 0; i < quantity; i++) {
            units[i] = new InventoryUnit({
                unitId: unitIds[i],
                dealer_Id: unitInfo.dealerId,
                variant_Id: unitInfo.variantId,
                dealerWarranty: dealerWarranty,
                currentStatus: "Due-Inspection"
            });

        }
        return InventoryUnit.insertMany(units);

    } catch (error) {
        console.log("Error in createUnit in service:", error);
        throw new Error(error);
    }
};

// -------------------------------------------------------------------------
export async function updateUnits(userRole, queries, newInfo) {
    try {
        const filter = setFilterObject(queries);
        const currentUnits = await InventoryUnit.find(filter);

        isUnitUpdateAuthorized(userRole, newInfo, currentUnits);
        if (currentUnits.length > 1) {
            isBulkUpdateValid(newInfo);
        }
        isUnitInfoValid(newInfo, currentUnits);

        const dealerWarranty = setDealerWarranty(newInfo.dwStartDate, newInfo.numOfDays);

        const unit = {
            unitId: newInfo.unitId,
            variant_Id: newInfo.variantId,
            dealer_Id: newInfo.dealerId,
            defect_Id: newInfo.defectId,
            currentStatus: newInfo.currentStatus,
            customerWarranty: newInfo.customerWarranty,
            dealerWarranty: dealerWarranty,
            purchaseCost: newInfo.purchaseCost,
            sellingPrice: newInfo.sellingPrice,
            soldPrice: newInfo.soldPrice
        };

        return await InventoryUnit.updateMany(filter, unit);

    } catch (error) {
        console.log("Error in updateUnits service: ", error);
        throw new Error(error);
    }
};

// -------------------------------------------------------------------------
export async function sellUnits(items) {
    try {
        isSaleInfoValid(items);

        const unitIds = items.map(item => item.unitId);
        const units = await InventoryUnit.find({ _id: { $in: unitIds } });
        isSaleValid(units, items);

        const customerWarranty = setCustomerWarranty("Sold");

        const operations = items.map(item => ({
            updateOne: {
                filter: { _id: item.unitId },
                update: {
                    $set: {
                        soldPrice: Number(item.soldPrice), currentStatus: "Sold", customerWarranty: customerWarranty
                    }
                }

            }
        }));

        return await InventoryUnit.bulkWrite(operations);

    } catch (error) {
        console.log("Error in sellUnit service: ", error);
        throw new Error(error);
    }
};

// -------------------------------------------------------------------------
export async function deleteUnits(queries) {
    try {
        const filter = setFilterObject(queries);
        return await InventoryUnit.deleteMany(filter);
    
    } catch (error) {
        console.log("Error in deleteUnit service: ", error);
        throw new Error(error);
    }
};