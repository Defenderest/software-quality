export class ExternalEchoGateway {
    constructor(baseUrl = 'https://postman-echo.com') {
        this.baseUrl = baseUrl;
    }

    async sendOrder(orderId, total) {
        const url = new URL('/get', this.baseUrl);

        url.searchParams.set('orderId', orderId);
        url.searchParams.set('total', String(total));

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`External service error: ${response.status}`);
        }

        const data = await response.json();

        return {
            orderId: data.args.orderId,
            total: Number(data.args.total),
        };
    }
}
