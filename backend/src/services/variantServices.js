import Variant from "../models/Variant.js";
import { setVariantId, setFilterObject } from "../utils/variantUtils.js";

export async function getAllVariants(queries){
    try{
        const filter = setFilterObject(queries);
        const variants = await Variant.find(filter);
        
        return variants;

    }catch(error){
        console.log("Error in getAllVariants service: ", error);
        throw new Error(error);
    }
};

// ---------------------------------------------------------------------------------------------------
export async function getVariant(id){
    try{
        const variant = await Variant.findById(id);
        return variant;

    }catch(error){
        console.log("Error in getVariant service: ", error);
        throw new Error(error);
    }
};

// ---------------------------------------------------------------------------------------------------
export async function createVariant(productId, variantInfo) {
    try{
        const variantId = setVariantId(variantInfo.ram, variantInfo.memory);
        
        const newVariant = new Variant({
            product_Id: productId,
            variantId: variantId,
            RAM: variantInfo.ram,
            memory: variantInfo.memory,
            quantity: variantInfo.quantity,
            displaySize: variantInfo.displaySize,
            displayType: variantInfo.displayType,
            processor: variantInfo.processor,
            graphicCard: variantInfo.graphicCard,
            storageType: variantInfo.storageType
        });
        
        const variant = await newVariant.save();
        
        return variant;

    }catch(error){
        console.log("Error in createVariant service: ", error);
        throw new Error(error);
    }
};

// ---------------------------------------------------------------------------------------------------
export async function updateVariant(id, newInfo){
    try{
        const variant = {
            product_Id: newInfo.productId,
            variantId: newInfo.variantId,
            RAM: newInfo.ram,
            memory: newInfo.memory,
            quantity: newInfo.quantity,
            displaySize: newInfo.displaySize,
            displayType: newInfo.displayType,
            processor: newInfo.processor,
            graphicCard: newInfo.graphicCard,
            storageType: newInfo.storageType
        };
        const updatedVariant = await Variant.findByIdAndUpdate(id, variant, {returnDocument: "After"});

        return updatedVariant;

    }catch(error){
        console.log("Error in updateVariant service: ", error);
        throw new Error(error);
    }
};

// ---------------------------------------------------------------------------------------------------
export async function deleteVariant(id){
    try{
        const deletedProduct = await Variant.findByIdAndDelete(id);
        return deletedProduct;

    }catch(error){
        console.log("Error in deleteVariant service: ", error);
        throw new Error(error);
    }
};