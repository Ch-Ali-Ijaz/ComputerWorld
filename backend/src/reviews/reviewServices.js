import Review from "./reviewModel.js";
import * as reviewUtil from "./reviewUtils.js";
import * as reviewValidator from "./reviewValidators.js";

export async function getReviews(queries) {

    const filter = reviewUtil.setReviewFilter(queries);
    return await Review.find(filter);
};

// ----------------------------------------------------------------------------
export async function createReview(userId, variantId, review) {
    
    const reviewId = reviewUtil.setReviewId();

    const newReview = new Review({
        reviewedBy: userId,
        variantId: variantId,
        reviewId: reviewId,
        starCount: review.stars,
        reviewContext: review.reviewContext
    });

    return await newReview.save();
};

// ----------------------------------------------------------------------------
export async function updateReview(userId, objectId, newInfo) {
    
    const review = await Review.findById(objectId);
    if(!review) {
        return;
    }
    reviewValidator.isOperationAllowed(userId, review.reviewedBy);

    const updatedReview = {
        starCount: newInfo.stars,
        reviewContext: newInfo.reviewContext
    }
    return await Review.findByIdAndUpdate(objectId, updatedReview, {returnDocument: "after"});
};

// ----------------------------------------------------------------------------
export async function deleteReview(userId, objectId) {
    
    const review = await Review.findById(objectId);
    if(!review) {
        return;
    }
    reviewValidator.isOperationAllowed(userId, review.reviewedBy);
    return await Review.findByIdAndDelete(objectId);
};