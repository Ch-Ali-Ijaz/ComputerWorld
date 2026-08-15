import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
    product_Id: {
        type: String,
        required: true,
        ref: "Product"
    },

    variantId: {
        type: String,
        unique: true,
        required: true
    },
    
    quantity: {
        type: Number,
        required: true
    },

    displaySize: {
        type: Number,
        required: true
    },
    
    displayType: {
        type: String,
        required: true
    },
    
    processor: {
        type: String,
        required: true
    },
    
    RAM: {
        type: Number,
        required: true
    },

    graphicCard: {
        type: String,
        required: true
    },

    memory: {
        type: Number,
        required: true
    },

    storageType: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

const Variant = mongoose.model("Variant", variantSchema);

export default Variant