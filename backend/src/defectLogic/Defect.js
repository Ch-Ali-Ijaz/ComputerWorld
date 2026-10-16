import mongoose from "mongoose";

const defectSchema = new mongoose.Schema({

    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    updatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "InventoryUnit"
    },

    defectId: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ["Resolved", "Pending"]
    }

},
    {timestamps: true}
);

const Defect = mongoose.model("Defect", defectSchema);
export default Defect