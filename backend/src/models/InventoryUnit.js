import mongoose from "mongoose";

const inventoryUnitSchema = new mongoose.Schema({
    unitId: {
        type: String,
        unique: true,
        required: true
    },

    variant_Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Variant"
    },

    dealer_Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Dealer"
    },

    defect_Id: {
        type: mongoose.Schema.Types.ObjectId, 
        default: null,
        ref: "Defect",
        unique: true
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
        type: Number
    },

    sellingPrice: {
        type: Number
    },

    soldPrice: {
        type: Number
    }

},

    { timestamps: true }
);

const InventoryUnit = mongoose.model("InventoryUnit", inventoryUnitSchema);

export default InventoryUnit