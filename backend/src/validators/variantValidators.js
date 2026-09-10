
export function isVariantInputValid(variantInfo) {

    if (variantInfo.ram && Number(variantInfo.ram) < 2) {
        throw new Error("RAM cannot be less than 2");
    }
    if (variantInfo.displaySize && Number(variantInfo.displaySize) < 11) {
        throw new Error("Display size cannot be less than 11");
    }
    if (variantInfo.availableUnits && Number(variantInfo.availableUnits) < 0) {
        throw new Error("Purchase quantity cannot be negative.");
    }


    const isGraphicCardAvailable = variantInfo.graphicCardStatus && variantInfo.graphicCardStatus === "Not-Available";
    if (!isGraphicCardAvailable && !variantInfo.graphicCardMemory) {
        throw new Error("Graphic card memory is required.");
    }
    if (isGraphicCardAvailable && variantInfo.graphicCardMemory) {
        throw new Error("Unnecessary field graphic card memory.");
    }
    if (variantInfo.graphicCardMemory && Number(variantInfo.graphicCardMemory) <= 0) {
        throw new Error("Graphic card memory cannot be 0 or less");
    }

};