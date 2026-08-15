import mongoose from "mongoose";

import { createProduct } from "../services/productServices.js";
import { createVariant } from "../services/variantServices.js";
import { createInventoryUnit } from "../services/inventoryUnitServices.js";

export async function createProductUseCase(productInfo) {
    
    const session = await mongoose.startSession();
    try{
        await session.startTransaction(async () => {
            const productId = await createProduct(productInfo);
            const variant = await createVariant(productId, productInfo.variant);
            const inventoryUnit = await createInventoryUnit(variant.id, variant.quantity, productInfo.inventory);
        });
    }
    catch(error){
        console.log("Error in createProductUseCase: ", error);
        throw new Error(error);
    }
};