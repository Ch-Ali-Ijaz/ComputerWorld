import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("123456789", 6);

export function setReviewId() {
    return "RVW" + nanoid();
};

// -------------------------------------------------------------------
export function setReviewFilter(queries) {
    const filter = {};
    if(Object.keys(queries).length === 0) {
        return filter;
    }

    if(queries.objectId) {
        filter._id = queries.objectId;
    }
    if(queries.reviewId) {
        filter.reviewId = queries.reviewId;
    }
    if(queries.reviewedBy) {
        filter.reviewedBy = queries.reviewedBy;
    }
    if(queries.variantId) {
        filter.variantId = queries.variantId;
    }
    if(queries.minStars || queries.maxStars) {
        filter.starCount = {};
        if(queries.minStars) {
            filter.starCount.$gte = queries.minStars;
        }
        if(queries.maxStars) {
            filter.starCount.$lte = queries.maxStars;
        }
    }

    return filter;
};