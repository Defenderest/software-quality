import { calculateDiscount } from './shop-utils.js';

export class CartService {
    constructor() {
        this.items = [];
    }

    addItem(price, quantity = 1) {
        this.items.push({ price, quantity });
    }

    getTotal() {
        return this.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    }

    getFinalTotal(discountPercent) {
        const total = this.getTotal();

        return calculateDiscount(total, discountPercent);
    }
}
