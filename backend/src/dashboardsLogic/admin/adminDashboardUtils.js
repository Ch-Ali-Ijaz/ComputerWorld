
export function setDate() {
    const currentMonth = new Date()
    currentMonth.setDate(2);
    currentMonth.setHours(0, 0, 0, 0);

    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1)
    return { currentMonth, prevMonth };
};

// -----------------------------------------------------------
export function extractSoldUnitsData(units, dates) {

    const unitsSoldThisMonth = [];
    const unitsSoldPrevMonth = [];
    if (units.length !== 0) {

        units.map(unit => {
            if (unit.updatedAt < dates.currentMonth) {
                unitsSoldPrevMonth.push(unit);
            } else {
                unitsSoldThisMonth.push(unit);
            }
        });
    }


    const thisMonthCount = countByBrand(unitsSoldThisMonth);
    const prevMonthCount = countByBrand(unitsSoldPrevMonth);

    const thisMonthProfit = calculateProfit(unitsSoldThisMonth);
    const prevMonthProfit = calculateProfit(unitsSoldPrevMonth);

    return {
        thisMonthCount,
        prevMonthCount,
        thisMonthProfit,
        prevMonthProfit
    };
};

// -----------------------------------------------------------
export function extractPurchasedUnitsData(units, dates) {

    const unitsPurchasedThisMonth = [];
    const unitsPurchasedPrevMonth = [];
    if (units.length !== 0) {

        units.map(unit => {
            if (unit.createdAt < dates.currentMonth) {
                unitsPurchasedPrevMonth.push(unit);
            } else {
                unitsPurchasedThisMonth.push(unit);
            }
        });
    }


    const thisMonthCount = countByBrand(unitsPurchasedThisMonth);
    const prevMonthCount = countByBrand(unitsPurchasedPrevMonth);

    const thisMonthPurchaseCost = calculatePurchaseCost(unitsPurchasedThisMonth);
    const prevMonthPurchaseCost = calculatePurchaseCost(unitsPurchasedPrevMonth);

    return {
        thisMonthCount,
        prevMonthCount,
        thisMonthPurchaseCost,
        prevMonthPurchaseCost
    };
};

// ----------------------------------------------------------------
function calculateProfit(units) {
    let profit = 0;
    
    units.map(unit=>{
        profit = profit + (unit.soldPrice - unit.purchaseCost);
    });

    return profit;
};

// ----------------------------------------------------------------
function calculatePurchaseCost(units) {
    let purchaseCost = 0;
    
    units.map(unit=>{
        purchaseCost = purchaseCost + unit.purchaseCost;
    });

    return purchaseCost;
};

// ----------------------------------------------------------------
function countByBrand(units) {
    const brandCount = {
        dell: 0,
        hp: 0,
        acer: 0,
        macbook: 0,
        lenovo: 0,
        msi: 0,
        razer: 0
    }
    if (units.length === 0) {
        return brandCount;
    }

    units.map(unit => {
        switch (unit.variantId.productId.brand) {
            case "DELL":
                brandCount.dell += 1;
                break;
            case "HP":
                brandCount.hp += 1;
                break;
            case "ACER":
                brandCount.acer += 1;
                break;
            case "MACBOOK":
                brandCount.macbook += 1;
                break;
            case "MSI":
                brandCount.msi += 1;
                break;
            case "LENOVO":
                brandCount.lenovo += 1;
                break;
            case "RAZER":
                brandCount.razer += 1;
                break;
        }
    });

    return brandCount;
};