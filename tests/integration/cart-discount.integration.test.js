import { describe, expect, test } from 'vitest';

import { CartService } from '../../src/cart-service.js';

describe('CartService + calculateDiscount integration', () => {
    test('applies discount to calculated cart total', () => {
        // Arrange
        const cart = new CartService();

        cart.addItem(100);
        cart.addItem(200);

        // Act
        const result = cart.getFinalTotal(10);

        // Assert
        expect(result).toBe(270);
    });

    test('propagates discount validation error', () => {
        // Arrange
        const cart = new CartService();

        cart.addItem(100);

        // Act + Assert
        expect(() => cart.getFinalTotal(110)).toThrow(
            'Discount must be between 0 and 100'
        );
    });
});
