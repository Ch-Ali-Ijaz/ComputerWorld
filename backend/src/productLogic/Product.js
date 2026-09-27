import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        unique: true,
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    series: {
        type: String,
        required: true
    },

    modelNo: {
        type: String,
        required: true,
        unique: true
    },
},

    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product