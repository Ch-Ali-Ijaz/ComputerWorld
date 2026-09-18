import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
    discountId: {
        type: String, 
        required: true,
        unique: true
    },
    discountCode: {
        type: String, 
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    targetType: {
        type: String,
        required: true,
        enum: ["Product", "Variant", "InventoryUnit", "Dealer"]
    },
    targetIds: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "targetType"
    }],
    applicableTo: {
        type: String,
        required: true,
        enum: ["All", "SpecificUsers"],
        refPath: "targetType"
    },
    userIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    discountType: {
        type: String,
        required: true,
        enum: ["fixed", "percentage"]
    },
    value: {
        type: Number,
        required: true,
        min: 0
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    maxQuantity: {
        type: Number,
        default: null
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
},
{ timestamps: true });

const Discount = mongoose.Model("Discount", discountSchema);

export default Discount;