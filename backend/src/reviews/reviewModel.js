import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    variantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Variant"
    },
    reviewId: {
        type: String,
        required: true,
        unique: true
    },
    starCount: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewContext: {
        type: String,
        required: true
    }
},
{timestamps: true});

const Review = mongoose.model("Review", reviewSchema);

export default Review