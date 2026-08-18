import mongoose from "mongoose";

const defectSchema = new mongoose.Schema({
    defectId: {
        type: String,
        required: true,
        unique: true
    },
    defectDescription: {
        type: String,
        required: true
    }

},
    {timestamps: true}
);

const Defect = new mongoose.model("Defect", defectSchema);
export default Defect