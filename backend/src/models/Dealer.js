import mongoose from "mongoose";

const dealerSchema = new mongoose.Schema({
    dealerId: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    address: {
        type: String
    }

},
    {timestamps: true}
);

const Dealer = new mongoose.model("Dealer", dealerSchema);
export default Dealer