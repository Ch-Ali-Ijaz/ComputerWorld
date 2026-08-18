import InventoryUnit from "../models/InventoryUnit.js";
import { setUnitId, setFilterObject } from "../utils/inventoryUnitUtils.js"

import * as inventoryUnitServices from "../services/inventoryUnitServices.js";

export async function getAllUnits(queries) {
    try {
        const filter = setFilterObject(queries);
        const units = await InventoryUnit.find(filter);

        return units;

    }catch(error){
        console.log("Error in createAllUnits services: ", error);
        throw new Error(error);
    }
};

// -------------------------------------------------------------------------
export async function getUnit(id) {
    try {
        const unit = await InventoryUnit.findById(id);
        return unit;

    }catch(error){
        console.log("Error in getUnit service: ", error);
        throw new Error(error);
    }
};

// -------------------------------------------------------------------------
export async function createUnit(variantId, unitInfo){
    try{
        let units = [];
        const unitIds = setUnitId(unitInfo.quantity);

        for(let i = 0; i < unitInfo.quantity; i++){
            units[i] = new InventoryUnit({
                unitId: unitIds[i],
                variant_Id: variantId,
                warranty: {
                    status: unitInfo.warrantyStatus,
                    startDate: unitInfo.warrantyStartDate,
                    endDate: unitInfo.warrantyEndDate
                },
                currentStatus: "Due-Inspection"
            });

        }

        return InventoryUnit.insertMany(units);

    }catch(error){
        console.log("Error in createInventryUnit in service:", error);
        throw new Error(error);
    }
};

// -------------------------------------------------------------------------
export async function updateUnit(id, newInfo) {
    try {
        const warrantyDates = updateDates(newInfo.currentStatus);

        const unit = new InventoryUnit({
            unitId: newInfo.unitId,
            currentStatus: newInfo.currentStatus,
            warranty: {
                startDate: warrantyDates.startDate,
                endDate: warrantyDates.endDate
            },
            purchaseCost: newInfo.purchaseCost,
            sellingPrice: newInfo.sellingPrice,
            soldPrice: newInfo.soldPrice

        });
        const updatedUnit = await InventoryUnit.findByIdAndUpdate(id, unit);

        return updatedUnit;

    }catch(error){
        console.log("Error in createInventoryUnit: ", error);
        throw new Error(error);
    }
};

// -------------------------------------------------------------------------
export async function deleteUnit(id) {
    try {
        const deletedUnit = await InventoryUnit.findByIdAndDelete(id);
        return deletedUnit;

    }catch(error){
        console.log("Error in deleteUnit service: ", error);
        throw new Error(error);
    }
};