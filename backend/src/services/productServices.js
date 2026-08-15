// models
import Product from "../models/Product.js";

// Utils
import { setProductId, setFilterObject } from "../utils/productUtils.js";

// Validators
// import { validateStatusDefect } from "../validators/productValidators.js";

// ----------------------------------------------------------------------------
export async function getAllProducts(queries) {
    try{
        const filter = setFilterObject(queries);

        const products = await Product.find(filter);
        return products;
    
    }
    catch(error){
        console.log("Error in getAllProducts service: ", error);
        throw new Error(error);
    }

}

// ----------------------------------------------------------------------------
export async function getProduct(id) {

    try{
        const product = await Product.findById(id);
        return product;
    }catch(error){

        console.log("Error in getProduct Service");
        throw new Error(error);
    }

}

// ----------------------------------------------------------------------------
export async function createProduct(productInfo) {
    try {
        const productId = setProductId(productInfo.brand, productInfo.series);
    
        const newProduct = new Product({
            productId: productId,
            brand: productInfo.brand,
            series: productInfo.series,
            modelNo: productInfo.model,
        });
    
        const product = await newProduct.save();
        
        
        return product._id;

    
    } catch (error) {
        console.log("Error in createProduct service: ", error);
        throw new Error(error);
    }
}

// ----------------------------------------------------------------------------
export async function updateProduct(id, newInfo) {
    try{
        
        const product = {
            productId: newInfo.productId,
            brand: newInfo.brand,
            series: newInfo.series,
            modelNo: newInfo.model
        };
        const updatedProduct = await Product.findByIdAndUpdate(id, product);
    
        return updatedProduct;

        
    }catch(error){
        console.log("Error in updatedProduct Service: ", error);
        throw new Error(error);
    }

}

// ----------------------------------------------------------------------------
export async function deleteProduct(id) {
    try
    {
        const product = await Product.findByIdAndDelete(id);
        return product;
        
    }catch(error){
        console.log("Error in deleteProduct service");
        throw new Error(error);
    }
}