import * as discountServices from "./discountServices.js";
import * as discountWorkflows from "./discountWorkflows.js";

export async function getDiscounts(req, res) {
    try{
        const queries = req.query;
        const discounts = await discountServices.getDiscounts(queries);

        if(discounts.length === 0){
            return res.status(404).json({
                code: "FAILURE", message: "Discount not found."
            });
        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "Retrieved Discounts: ", discounts: discounts
            });
        }

    }catch(error) {
        console.log("Error: ", error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
};

// ----------------------------------------------------------------------------------------
export async function createDiscount(req, res) {
    try{
        const discountInfo = req.body;
        const newDiscount = await discountServices.createDiscount(discountInfo);

        return res.status(200).json({
            code: "SUCCESS", message: "Creation Success.", discount: newDiscount
        });
    
    } catch(error) {
        console.log("Error in createDiscount controller.", error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
};

// ----------------------------------------------------------------------------------------
export async function updateDiscount(req, res) {
    try{
        const objectId = req.params.id;
        const data = req.body;
        const updatedDiscount = await discountWorkflows.updateWorkflow(objectId, data);

        return res.status(200).json({
            code: "SUCCESS", message: "Update Successfull.", updatedDiscount: updatedDiscount
        });
        
    } catch(error) {
        console.log("Error in updateDiscount controller.", error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
};

// ----------------------------------------------------------------------------------------
export async function deleteDiscount(req, res) {
    try{
        const objectId = req.params.id;
        const deletedDiscount = await discountServices.deleteDiscount(objectId);

        if(!deletedDiscount) {
            return res.status(404).json({
                code: "FAILURE", message: "Discount not found."
            });
        } else {
            return res.status(200).json({
                code: "SUCCESS", message: "Delete Successfull.", deletedDiscount: deletedDiscount
            });
        }

    }catch(error) {
        console.log("Error in deleteDiscount controller.", error);
        return res.status(500).json({
            code: "ERROR", message: "Internal Server Error."
        });
    }
};