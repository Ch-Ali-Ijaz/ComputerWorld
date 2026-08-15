import * as productServices from "../services/productServices.js";

export async function getAllProducts(req, res) {
    try {
        const queries = req.query;
        const products = await productServices.getAllProducts(queries);

        if (products.length === 0) {
            return res.status(404).json({
                code: "FAILURE", message: "No products found."
            });
        }
        else {
            return res.status(200).json({
                code: "SUCCESS", products
            });
        }

    } catch (error) {
        console.log("Error in getAllProducts controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "An error occured while finding products."
        });
    }
}

// ------------------------------------------------------------------------------------------
export async function getProduct(req, res) {
    try {
        const id = req.params.id;
        const product = await productServices.getProduct(id);

        if (!product) {
            return res.status(404).json({
                code: "FAILURE", message: "Product not found." 
            });
        }
        else {
             return res.status(200).json({
                code: "SUCCESS", Product: product
            });
        }

    } catch (error) {
        console.log("Error in getProduct controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "An error occured while getting the product."
        });
    }
}

// ------------------------------------------------------------------------------------------
export async function createProduct(req, res) {
    try {
        const productInfo = req.body;
        const object_Id = await productServices.createProduct(productInfo);

        if (!object_Id) {
            return res.status(400).json({
                code: "FAILURE", message: "Failed to create product."
            });
        }
        else {
            return res.status(201).json({
                code: "SUCCESS", message: "Product created Successfully", ProductId: object_Id
            });
        }

    } catch (error) {
        console.log("Error in createProduct controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "An error occured while creating the product."
        });
    }
}

// ------------------------------------------------------------------------------------------
export async function updateProduct(req, res) {
    try {
        const id = req.params.id;
        const newInfo = req.body;
        const updatedProduct = await productServices.updateProduct(id, newInfo);

        if (!updatedProduct) {
            return res.status(500).json({
                code: "FAILURE", message: "Product update failed."
            });
        }
        else {
            return res.status(500).json({
                code: "SUCCESS", message: "Product update Successfull."
            });
        }

    } catch (error) {
        console.log("Error in updateProduct controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "An error occured while updating the product.", updatedProduct: updateProduct
        });
    }
};

// ------------------------------------------------------------------------------------------
export async function deleteProduct(req, res) {
    try {

        const product = await productServices.deleteProduct(req.params.id);

        if (!product) {
            return res.status(400).json({
                code: "FAILED", message: "Product deletion failed."
            });
        }
        else {
            return res.status(200).json({
                code: "SUCCESS", message: "Product Deletion Successfull.", deletedProduct: product
            });
        }

    } catch (error) {
        console.log("Error in deleteProduct controller: ", error);
        return res.status(500).json({
            code: "ERROR", message: "An error occured while deleting the product."    
        });
    }
};