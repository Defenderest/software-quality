import { describe, expect, test } from 'vitest';

import { ExternalEchoGateway } from '../../src/external-echo.gateway.js';

describe('ExternalEchoGateway system integration', () => {
    test('sends order data to external system', async () => {
        // Arrange
        const gateway = new ExternalEchoGateway();

        // Act
        const result = await gateway.sendOrder('ORD-001', 270);

        // Assert
        expect(result).toEqual({
            orderId: 'ORD-001',
            total: 270,
        });
    }, 10_000);
});
