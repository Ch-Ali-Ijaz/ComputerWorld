import mongoose from "mongoose";

const inventoryUnitSchema = new mongoose.Schema({
    unitId: {
        type: String,
        unique: true,
        required: true
    },

    variant_Id: {
        type: String,
        required: true,
        ref: "Variant"
    },

    dealer_Id: {
        type: String, 
        required: true
    },

    defect_Id: {
        type: String, 
        required: true
    },
    
    currentStatus: {
        type: String,
        enum: ["Due-Inspection", "Available", "Sold", "Reserved", "Defective", "Scrap"],
        required: true
    },

    warranty: {
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
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

inventoryUnitSchema.index(
    { "unitDefect.defectId": 1 },
    {
        unique: true,
        partialFilterExpression: {
            "unitDefect.defectId": {
                $exists: true,
                $type: "string"
            }
        }
    }
);
const InventoryUnit = mongoose.model("InventoryUnit", inventoryUnitSchema);

export default InventoryUnit