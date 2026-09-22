import Discount from "./discountModel.js";
import * as discountUtils from "./discountUtils.js";
import { isDiscountInputValid } from "./discountValidators.js";
import { resolveTargetIds, resolveUserIds } from "./disountResolvers.js";

export async function getDiscounts(queries) {
    const filter = discountUtils.setDiscountFilter(queries);
    return await Discount.find(filter);

};

// -----------------------------------------------------------------------------------------------------------
export async function createDiscount(discountInfo) {

    isDiscountInputValid(discountInfo);
    const discountId = discountUtils.setDiscountId(discountInfo.targetType);
    const discountCode = discountUtils.setDiscountCode(discountInfo.name);
    const userIds = await resolveUserIds(discountInfo.applicableTo, discountInfo.userCriteria);
    const targetIds = await resolveTargetIds(discountInfo.targetType, discountInfo.targetCriteria);

    const newDiscount = new Discount({
        discountId: discountId,
        discountCode: discountCode,
        name: discountInfo.name,
        description: discountInfo.discription,
        targetType: discountInfo.targetType,
        targetIds: targetIds,
        applicableTo: discountInfo.applicableTo,
        userIds: userIds,
        discountType: discountInfo.discountType,
        value: discountInfo.value,
        startDate: discountInfo.startDate,
        endDate: discountInfo.endDate,
        maxQuantity: discountInfo.maxQuantity
    });

    return await newDiscount.save();

};

// -----------------------------------------------------------------------------------------------------------
export async function updateDiscount(objectId, newInfo) {

    isDiscountInputValid(newInfo);
    const discountCode = discountUtils.setDiscountCode(newInfo.name);
    const userIds = await resolveUserIds(newInfo.applicableTo, newInfo.userCriteria);
    const targetIds = await resolveTargetIds(newInfo.targetType, newInfo.targetCriteria);

    const updatedDiscount = {
        discountCode: discountCode,
        name: newInfo.name,
        description: newInfo.discription,
        targetType: newInfo.targetType,
        targetIds: targetIds,
        applicableTo: newInfo.applicableTo,
        userIds: userIds,
        discountType: newInfo.discountType,
        value: newInfo.value,
        startDate: newInfo.startDate,
        endDate: newInfo.endDate,
        maxQuantity: newInfo.maxQuantity
    };

    return await Discount.findByIdAndUpdate(objectId, updatedDiscount, { returnDocument: "after" });

};

// -----------------------------------------------------------------------------------------------------------
export async function toggleActiveField(objectId) {
    
    let toggle;
    const discount = await Discount.findById(objectId);
    if (discount.isActive === true) {
        toggle = false;
    } else {
        toggle = true;
    }
    
    return await Discount.findByIdAndUpdate(
        objectId,
        {
            isActive: toggle
        },
        { returnDocument: "after" }
    );
    
};

// -----------------------------------------------------------------------------------------------------------
export async function deleteDiscount(objectId) {
    return await Discount.findByIdAndDelete(objectId);
}