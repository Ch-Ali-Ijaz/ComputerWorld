import mongoose from "mongoose";

const inventoryUnitSchema = new mongoose.Schema({
    unitId: {
        type: String,
        unique: true,
        required: true
    },

    variantId: {
        type: String,
        required: true,
        ref: "Variant"
    },

    currentStatus: {
        type: String,
        enum: ["Due-Inspection", "available", "claim-warranty", "sold", "reserved", "defective"],
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

    price: {
        type: Number,
        required: true
    },

    unitDefect:{
        defectId: {
            type: String,
            unique: true
        },
        defectDescription: {
            type: String,
        }
    }
},

    { timestamps: true }
);

// productSchema.index(
//     { "productDefect.defectId": 1 },
//     {
//         unique: true,
//         partialFilterExpression: {
//             "productDefect.defectId": {
//                 $exists: true,
//                 $type: "string"
//             }
//         }
//     }
// );
const InventoryUnit = mongoose.model("InventoryUnit", inventoryUnitSchema);

export default InventoryUnit