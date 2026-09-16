import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    deliveryPersonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    orderType: {
        type: String,
        enum: ["Walk-In", "online"],
        required: true
    },
    orderStatus: {
        type: String,
        enum: ["Completed", "In-Progress", "Waiting-to-Deliver", "On-The-Way", "Delivered"],
        required: true
    },
    items: [
        {
            variantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Variant" },
            unitIds: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "InventoryUnit" }],
            quantity: { type: Number, required: true },
            unitPrice: {type: Number, required: true},
            totalPrice: { type: Number, required: true }
        }
    ],
    paymentMethod: {
        type: String,
        enum: ["cash", "online"],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["Due", "Paid"]
    },
    subTotal: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0,
        min: 0
    },
    deliveryFee: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model("Order", orderSchema);

export default Order