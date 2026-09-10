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

    availableUnits: {
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

    graphicCardStatus: {
        type: String,
        enum: ["Not-Available", "Removable", "Non-Removable"],
        required: true
    },
    graphicCardMemory: {
        type: Number
    },

    memory: {
        type: Number,
        required: true
    },

    storageType: {
        type: String,
        enum: ["SSD", "HHD", "both(SSD & HHD)"],
        required: true
    },

    sellingPrice: {
        type: Number
    }
},
    { timestamps: true }
);

const Variant = mongoose.model("Variant", variantSchema);

export default Variant