import * as variantServices from "../services/variantServices.js";

export async function getAllVariants(req, res){
    try{
        const queries = req.query;
        const variants = await variantServices.getAllVariants(queries);

        if(variants.length === 0){
            return res.status(404).json({
                code: "NOT_FOUND", message: "No variants found"
            });
        }else{
            return res.status(404).json({
                code: "SUCCESS", variants: variants
            });
        }

    }catch(error){
        console.log("Error in getAllVariants controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error getting all variants."
        });
    }
};

// ---------------------------------------------------------------------------------------------------
export async function getVariant(req, res){
    try{
        const id = req.params.id;
        const variant = await variantServices.getVariant(id);

        if(!variant){
            return res.status(404).json({
                code: "NOT_FOUND", message: "Variant not found."
            });
        }else{
            return res.status(200).json({
                code: "SUCCESS", variant: variant
            });
        }

    }catch(error){
        console.log("Error in getVariant controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error getting the variant."
        });
    }
};

// ---------------------------------------------------------------------------------------------------
export async function createVariant(req, res){
    try{
        const productId = req.params.id;
        const variantInfo = req.body;
        const newVariant = await variantServices.createVariant(productId, variantInfo);

        if(!newVariant){
            return res.status(400).json({
                code: "FAILURE", message: "Product creation Failed."
            });
        }
        else{
            return res.status(200).json({
                code: "SUCCESS", message: "Product creation Successfull."
            });
        }

    }catch(error){
        console.log("Error in createVariant controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error creating variant."
        });
    }
};

// ---------------------------------------------------------------------------------------------------
export async function updateVariant(req, res){
    try{
        const id = req.params.id;
        const newInfo = req.body;
        const updatedProduct = await variantServices.updateVariant(id, newInfo);

        if(!updatedProduct){
            return res.status(404).json({
                code: "NOT_FOUND", message: "Variant not found"
            });
        }else{
            return res.status(404).json({
                code: "SUCCESS", message: "Variant updated Successfully.", updatedProduct: updatedProduct
            });
        }

    }catch(error){
        console.log("Error in updateVariant controller: ", error);
        return res.status(500).json({ code: "ERROR", message: "Error updating the variant." });
    }
};

// ---------------------------------------------------------------------------------------------------
export async function deleteVariant(req, res){
    try{
        const id = req.params.id;
        const deletedVariant = await variantServices.deleteVariant(id);

        if(!deletedVariant){
            return res.status(404).json({
                code: "NOT_FOUND", message: "Variant not found."
            });
        }else{
            return res.status(404).json({
                code: "SUCCESS", message: "Variant Deletion Successfull", deletedVariant: deletedVariant
            });
        }

    }catch(error){
        console.log("Error in deleteVariant controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Error deleting the variant."
        });
    }
};