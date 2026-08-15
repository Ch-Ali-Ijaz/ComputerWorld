import InventoryUnit from "../models/InventoryUnit.js";
import { setInventoryUnitId } from "../utils/inventoryUnitUtils.js"

export async function createInventoryUnit(variantId, quantity, inventoryInfo){
    try{
        const unitId = setInventoryUnitId(quantity);

        for(let i = 0; i < quantity; i++){
            const newInventoryUnit = new InventoryUnit({
                unitId: unitId[i],
                variantId: variantId,
                currentStatus: "Due-Inspection",
                price: inventoryInfo.price
            });

            await newInventoryUnit.save();
        }

        return true;


    }catch(error){
        console.log("Error in createInventryUnit in service:", error);
        throw new Error(error);
    }
};