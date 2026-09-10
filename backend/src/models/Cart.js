import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    cartId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [
        {
            variantId: {type: mongoose.Schema.Types.ObjectId, ref: "Variant"},
            quantity: {type: Number, required: true, min: 1}
        }
    ]
},
{timestamps: true}
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;