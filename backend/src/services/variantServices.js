import Variant from "../models/Variant.js";
import { setVariantId } from "../utils/variantUtils.js";

export async function createVariant(id, variantInfo) {
    try{
        const variantId = setVariantId(variantInfo.ram, variantInfo.memory);
        const newVariant = new Variant({
            productId: id,
            variantId: variantId,
            ram: variantInfo.ram,
            memory: variantInfo.memory,
            quantity: variantInfo.quantity,
            displaySize: variantInfo.displaySize,
            displayType: variantInfo.displayType,
            processor: variantInfo.processor,
            graphicCard: variantInfo.graphicCard,
            storageType: variantInfo.storageType
        });
        
        const variant = await newVariant.save();
        
        return { id: variant.variantId, quantity: variant.quantity };

    }catch(error){
        console.log("Error in createVariant service: ", error);
        throw new Error(error);
    }
};