import Variant from "../models/Variant.js";
import { setVariantId, setFilterObject } from "../utils/variantUtils.js";
import { isVariantInputValid } from "../validators/variantValidators.js";

export async function getVariants(queries) {
    try {
        const filter = setFilterObject(queries);
        const variants = await Variant.find(filter);

        return variants;

    } catch (error) {
        console.log("Error in getAllVariants service: ", error);
        throw new Error(error);
    }
};

// ---------------------------------------------------------------------------------------------------
export async function createVariant(productId, variantInfo) {
    try {
        isVariantInputValid(variantInfo);

        const variantId = setVariantId(variantInfo.ram, variantInfo.memory);
        const newVariant = new Variant({
            product_Id: productId,
            variantId: variantId,
            RAM: Number(variantInfo.ram),
            memory: Number(variantInfo.memory),
            availableUnits: Number(0),
            displaySize: Number(variantInfo.displaySize),
            displayType: variantInfo.displayType,
            processor: variantInfo.processor,
            graphicCardStatus: variantInfo.graphicCardStatus,
            graphicCardMemory: Number(variantInfo.graphicCardMemory),
            storageType: variantInfo.storageType
        });

        const variant = await newVariant.save();

        return variant;

    } catch (error) {
        console.log("Error in createVariant service: ", error);
        throw new Error(error);
    }
};

// ---------------------------------------------------------------------------------------------------
export async function updateVariant(id, newInfo) {
    try {
        isVariantInputValid(newInfo);

        const variant = {
            product_Id: newInfo.productId,
            variantId: newInfo.variantId,
            RAM: Number(newInfo.ram),
            memory: Number(newInfo.memory),
            availableUnits: Number(newInfo.availableUnits),
            displaySize: Number(newInfo.displaySize),
            displayType: newInfo.displayType,
            processor: newInfo.processor,
            graphicCardStatus: newInfo.graphicCardStatus,
            graphicCardMemory: Number(newInfo.graphicCardMemory),
            storageType: newInfo.storageType
        };
        const updatedVariant = await Variant.findByIdAndUpdate(id, variant, { returnDocument: "after" });

        return updatedVariant;

    } catch (error) {
        console.log("Error in updateVariant service: ", error);
        throw new Error(error);
    }
};

// ---------------------------------------------------------------------------------------------------
export async function getSellingPrice(variantId) {
    try {
        const variant = await Variant.findById(variantId);

        if (!variant.sellingPrice) {
            throw new Error(`Selling price not found against VariantId: ${variantId}`);
        }

        return variant.sellingPrice;

    } catch (error) {
        console.log(error);
        throw new Error("Error in getSellingPrice Service.");
    }
};

// ---------------------------------------------------------------------------------------------------
export async function setSellingPrice(objectId, sellingPrice, availableUnits) {
    try {
        const variant = {
            availableUnits: Number(availableUnits),
            sellingPrice: Number(sellingPrice)
        }

        return await Variant.updateOne(
            { _id: objectId },
            variant
        );
    } catch (error) {
        console.log(error);
        throw new Error("Error in setSellingPrice Service.");
    }
};

// ---------------------------------------------------------------------------------------------------
export async function deleteVariant(id) {
    try {
        const deletedProduct = await Variant.findByIdAndDelete(id);
        return deletedProduct;

    } catch (error) {
        console.log("Error in deleteVariant service: ", error);
        throw new Error(error);
    }
};