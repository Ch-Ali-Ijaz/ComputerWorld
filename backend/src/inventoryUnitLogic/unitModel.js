import mongoose from "mongoose";

const inventoryUnitSchema = new mongoose.Schema({
    unitId: {
        type: String,
        unique: true,
        required: true
    },

    variantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Variant"
    },

    dealerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Dealer"
    },

    defectId: {
        type: mongoose.Schema.Types.ObjectId, 
        default: null,
        ref: "Defect"
    },
    
    currentStatus: {
        type: String,
        enum: ["Due-Inspection", "Available", "Sold", "Reserved", "Defective", "Scrap"],
        required: true
    },

    dealerWarranty: {
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        }
    },
    customerWarranty: {
        startDate: {
            type: Date
        },
        endDate: {
            type: Date,
        }
    },

    purchaseCost: {
        type: Number,
        default: 0
    },
    

    soldPrice: {
        type: Number,
        default: 0
    }

},

    { timestamps: true }
);

const InventoryUnit = mongoose.model("InventoryUnit", inventoryUnitSchema);

export default InventoryUnit