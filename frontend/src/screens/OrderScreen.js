import { deliverOrder, getOrder } from "../api";
import { getUserInfo } from "../localStorage";
import { hideLoading, parseRequestURL, rerender, showLoading, showMessage } from "../utils";

const OrderScreen = {
    after_render: async () => { 
        const request = parseRequestURL();
        document.getElementById('deliver-order-button').addEventListener('click', async() => {
            showLoading();
            await deliverOrder(request.id);
            hideLoading();
            showMessage('Заказ отправлен!');
            rerender(OrderScreen);
        })
    },
    render: async () => {
        const { isAdmin } = getUserInfo();
        const request = parseRequestURL();
        const {_id, shipping, payment,orderItems, itemsPrice, shippingPrice, taxPrice, totalPrice, isDelivered, deliveredAt, isPaid, paidAt} = await getOrder(request.id);
        return `
        <div>
        <h1>Заказ №${_id}</h1>
            <div class="order">
                <div class="order-info">
                    <div>
                        <h2>Адрес</h2>
                        <div>
                            ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, ${shipping.country}
                        </div>
                        ${isDelivered ? `<div class="success">Доставлено ${deliveredAt}</div>` : 
                    `<div class="error">В процессе доставки</div>`}
                    </div>
                    <div>
                        <h2>Оплата</h2>
                        <div>
                            Способ оплаты: ${payment.paymentMethod}
                        </div>
                        ${isPaid ? `<div class="success">Оплачено ${paidAt}</div>` : 
                    `<div class="error">Ожидается оплата</div>`}
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
                        <li>
                        ${!isPaid ? `<button class='full-width to-cart'>Оплатить</button>` : ''}
                        </li>
                        <li>
                        ${!isDelivered && isAdmin ? `<button id="deliver-order-button" class='full-width to-cart'>Доставить</button>` : ''}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
                            `
    }
}

export default OrderScreen;