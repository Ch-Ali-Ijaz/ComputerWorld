import mongoose from "mongoose";

const defectSchema = new mongoose.Schema({

    creator_Id: {
        type: String,
        required: true,
        ref: "User"
    },
    updator_Id: {
        type: String,
        ref: "User"
    },

    unit_Id: {
        type: String,
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

const Defect = new mongoose.model("Defect", defectSchema);
export default Defect