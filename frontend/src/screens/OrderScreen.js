import { deliverOrder, getOrder, paidOrder } from "../api";
import { getUserInfo } from "../localStorage";
import { hideLoading, parseRequestURL, rerender, showLoading, showMessage } from "../utils";

const OrderScreen = {
    after_render: async () => { 
        const request = parseRequestURL();
        if(document.getElementById('paid-button')) {
            document.getElementById('paid-button').addEventListener('click', async() => {
            showLoading();
            await paidOrder(request.id);
            hideLoading();
            showMessage('Заказ оплачен!');
            rerender(OrderScreen);
            })
        };
        if(document.getElementById('deliver-order-button')) {
            document.getElementById('deliver-order-button').addEventListener('click', async() => {
            showLoading();
            await deliverOrder(request.id);
            hideLoading();
            showMessage('Заказ отправлен!');
            rerender(OrderScreen);
        })
        }
    },
    render: async () => {
        let isCart = false;
        let isCash = false;
        
        const { isAdmin } = getUserInfo();
        const request = parseRequestURL();
        const {_id, shipping, payment,orderItems, itemsPrice, shippingPrice, taxPrice, totalPrice, isDelivered, deliveredAt, isPaid, paidAt} = await getOrder(request.id);
        payment.paymentMethod === 'Наличными' ? isCash = true : isCart = true;
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
                        ${!isPaid && isCart ? `<button id="pay-order-button" class='full-width to-cart'>Оплатить</button>` : ''}
                        </li>
                        <li>
                        ${!isPaid && isDelivered  && isCash && isAdmin ? `<button id="paid-button" class='full-width to-cart'>Оплачено</button>` : ''}
                        </li>
                        <li>
                        ${!isDelivered && (isPaid || isCash) && isAdmin ? `<button id="deliver-order-button" class='full-width to-cart'>Доставить</button>` : ''}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
                            `
    }
}

export default OrderScreen;