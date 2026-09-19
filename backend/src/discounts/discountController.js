import * as discountServices from "./discountServices.js";

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
}