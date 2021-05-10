import { createOrder } from "../api";
import CheckoutSteps from "../components/checkoutSteps";
import { cleanCart, getCartItems, getPayment, getShipping } from "../localStorage"
import { hideLoading, showLoading, showMessage } from "../utils";

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

    let isPaid = false, paidAt;
    if(payment.paymentMethod === 'Картой') {
        isPaid = true;
        paidAt = Date.now();
    }

    const itemsPrice = orderItems.reduce((a,c) => a+c.price*c.qty, 0);
    const shippingPrice = itemsPrice > 100? 0: 10;
    const taxPrice = 0.01 * itemsPrice * 100 / 100;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    if(isPaid) {
        return {
        orderItems, isPaid, paidAt, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice,
    }
} else {
    return {
        orderItems, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice,
    }
}
    
}

const PlaceOrderScreen = {
    after_render: async () => {
        document.getElementById('placeorder-button').addEventListener('click', async () => {
        const order = convertCartToOrder();
        showLoading();
        const data = await createOrder(order);
        hideLoading();
        if(data.error) {
            showMessage(data.error);
        } else {
            cleanCart();
            document.location.hash = '/order/' + data.order._id;
        }
        })
        
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
                        <li> <button id="placeorder-button" class="to-cart full-width"> Оформить заказ </button> </li>
                </div>
            </div>
        </div>
                            `
    }
}

export default PlaceOrderScreen;