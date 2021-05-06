import CheckoutSteps from "../components/checkoutSteps";
import { getCartItems, getPayment, getShipping } from "../localStorage"

const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if(orderItems.length === 0){
        document.location.hash='/cart';
    }

    const shipping = getShipping();
    if(!shipping.address) {
        document.location.hash = '/shipping';
    }

    const payment = getPayment();
    if(!payment.paymentMethod) {
        document.location.hash = '/payment';
    }

    const itemsPrice = orderItems.reduce((a,c) => a+c.price*c.qty, 0);
    const shippingPrice = itemsPrice > 100? 0: 10;
    const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    return {
        orderItems, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice,
    }
}

const PlaceOrderScreen = {
    after_render: () => {

    },
    render: () => {
        const {orderItems, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice} = convertCartToOrder();
        return `
        <div>
            ${CheckoutSteps.render({step1: true, step2: true, step3: true, step4: true,})}
            <div class="order">
                <div class="order-info">
                    <div>
                        <h2>Адрес</h2>
                        <div>
                            ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, ${shipping.country}
                        </div>
                    </div>
                    <div>
                        <h2>Оплата</h2>
                        <div>
                            Способ оплаты: ${payment.paymentMethod}
                        </div>
                    </div>
                    <div>
                        <ul class="cart-list-container">
                            <li>
                                <h2>Список товаров</h2>
                                <div>Цена</div>
                            </li>
                            ${orderItems.map(item => `
                            <li>
                                <div class="cart-image">
                                    <img src="${item.image}" alt="${item.name}"/>
                                </div>
                                <div class="cart-name">
                                    <div>
                                        <a href="/#/product/${item.product}">${item.name}</a>
                                    </div>
                                    <div> Количество: ${item.qty} </div>
                                </div>
                                <div class="cart-price"> $${item.price}</div>
                            </li>
                            `)}
                        </ul>
                    </div>
                </div>
                <div class="order-action">
                    <ul>
                        <li>
                            <h2>Сумма заказа</h2>
                        </li>
                        <li><div>За товар</div><div>$${itemsPrice}</div></li>
                        <li><div>Доставка</div><div>$${shippingPrice}</div></li>
                        <li><div>Налог</div><div>$${taxPrice}</div></li>
                        <li class="total"><div>Итог</div><div>$${totalPrice}</div></li>
                        <li> <button class="to-cart full-width"> Оформить заказ </button> </li>
                </div>
            </div>
        </div>
                            `
    }
}

export default PlaceOrderScreen;