import { describe, expect, test } from 'vitest';
import {
    calculateDiscount,
    validateQuantity,
    getShippingCost,
} from '../src/shop-utils.js';

describe('calculateDiscount', () => {
    test('returns 90 for price 100 and discount 10%', () => {
        // Arrange
        const price = 100;
        const percent = 10;

        // Act
        const result = calculateDiscount(price, percent);

        // Assert
        expect(result).toBe(90);
    });

    test('returns 100 for price 100 and discount 0%', () => {
        // Arrange
        const price = 100;
        const percent = 0;

        // Act
        const result = calculateDiscount(price, percent);

        // Assert
        expect(result).toBe(100);
    });

    test('returns 0 for price 100 and discount 100%', () => {
        // Arrange
        const price = 100;
        const percent = 100;

        // Act
        const result = calculateDiscount(price, percent);

        // Assert
        expect(result).toBe(0);
    });

    test('throws error for negative price -10 and discount 10%', () => {
        // Arrange
        const price = -10;
        const percent = 10;

        // Act + Assert
        expect(() => calculateDiscount(price, percent)).toThrow(
            'Price must be a non-negative number'
        );
    });

    test('returns 0 for zero price and discount 10%', () => {
        // Arrange
        const price = 0;
        const percent = 10;

        // Act
        const result = calculateDiscount(price, percent);

        // Assert
        expect(result).toBe(0);
    });

    test.for([
        { price: NaN, label: 'NaN' },
        { price: Infinity, label: 'Infinity' },
    ])('throws error for non-finite price $label', ({ price }) => {
        // Arrange
        const percent = 10;

        // Act + Assert
        expect(() => calculateDiscount(price, percent)).toThrow(
            'Price must be a non-negative number'
        );
    });

    test.for([
        { percent: -1, label: '-1' },
        { percent: 101, label: '101' },
        { percent: NaN, label: 'NaN' },
    ])('throws error for invalid discount $label and price 100', ({ percent }) => {
        // Arrange
        const price = 100;

        // Act + Assert
        expect(() => calculateDiscount(price, percent)).toThrow(
            'Discount must be between 0 and 100'
        );
    });
});

describe('validateQuantity', () => {
    test.for([
        { quantity: 0, expected: false },
        { quantity: 1, expected: true },
        { quantity: 2, expected: true },
        { quantity: 9, expected: true },
        { quantity: 10, expected: true },
        { quantity: 11, expected: false },
        { quantity: 1.5, expected: false },
    ])('validateQuantity($quantity) returns $expected', ({ quantity, expected }) => {
        // Arrange: quantity and expected come from the test data table.

        // Act
        const result = validateQuantity(quantity);

        // Assert
        expect(result).toBe(expected);
    });
});

describe('getShippingCost', () => {
    test('returns 100 for total 999 below the free shipping boundary', () => {
        // Arrange
        const total = 999;

        // Act
        const result = getShippingCost(total);

        // Assert
        expect(result).toBe(100);
    });

    test('returns 0 for total 1000 at the free shipping boundary', () => {
        // Arrange
        const total = 1000;

        // Act
        const result = getShippingCost(total);

        // Assert
        expect(result).toBe(0);
    });

    test('throws error for negative total -1', () => {
        // Arrange
        const total = -1;

        // Act + Assert
        expect(() => getShippingCost(total)).toThrow(
            'Total must be a non-negative number'
        );
    });

    test('returns 100 for total 0 at the minimum valid boundary', () => {
        // Arrange
        const total = 0;

        // Act
        const result = getShippingCost(total);

        // Assert
        expect(result).toBe(100);
    });

    test('throws error for non-finite total Infinity', () => {
        // Arrange
        const total = Infinity;

        // Act + Assert
        expect(() => getShippingCost(total)).toThrow(
            'Total must be a non-negative number'
        );
    });
});
