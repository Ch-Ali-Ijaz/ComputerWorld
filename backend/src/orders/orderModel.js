import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: "User"
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
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
        enum: ["Completed", "In-Progress", "Waiting-to-Deliver", "On-The-Way", "Delivered", "Canceled"],
        required: true
    },
    orderedItems: [
        {
            variantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Variant" },
            unitIds: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "InventoryUnit" }],
            quantity: { type: Number, required: true },
            unitPrice: {type: Number, required: true},
            subTotal: { type: Number, required: true, min: 0 },
            discount: {type: Number, required: true, default: 0, min: 0},
            totalPrice: { type: Number, required: true, min: 0 }
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
    totalDiscount: {
        type: Number,
        default: 0,
        min: 0
    },
    deliveryAddress: {
        type: String
    },
    deliveryFee: {
        type: Number,
        default: 0
    },
    payableAmount: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model("Order", orderSchema);

export default Order