export function calculateDiscount(price, percent) {
    if (!Number.isFinite(price) || price < 0) {
        throw new Error(
            'Price must be a non-negative number'
        );
    }

    if (
        !Number.isFinite(percent) ||
        percent < 0 ||
        percent > 100
    ) {
        throw new Error(
            'Discount must be between 0 and 100'
        );
    }

    return price - price * percent / 100;
}

export function validateQuantity(quantity) {
    return (
        Number.isInteger(quantity) &&
        quantity >= 1 &&
        quantity <= 10
    );
}

export function getShippingCost(total) {
    if (!Number.isFinite(total) || total < 0) {
        throw new Error(
            'Total must be a non-negative number'
        );
    }

    if (total >= 1000) {
        return 0;
    }

    return 100;
}