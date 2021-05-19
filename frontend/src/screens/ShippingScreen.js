import CheckoutSteps from "../components/checkoutSteps";
import { getUserInfo, getShipping, setShipping } from "../localStorage";

const ShippingScreen = {
    after_render: () => {
        document.getElementById("shipping-form").addEventListener('submit', async (e) => {
            e.preventDefault();
            setShipping({
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postalCode: document.getElementById('postalCode').value,
                country: document.getElementById('country').value,
            });
            document.location.hash = '/payment';
        })
    },
    render: () => {
        const {name} = getUserInfo();
        if(!name) {
            document.location.hash = '/';
        }
        const {address, city, postalCode, country} = getShipping();
        return `
        ${CheckoutSteps.render({step1: true, step2: true})}
        <div class="form-container">
            <form id="shipping-form">
                <ul class="form-items">
                    <li>
                        <h1>Адрес</h1>
                    </li>
                    <li>
                        <label for="address">Адрес (в формате "Название улицы, номер дома")</label>
                        <input type="text" name="address" pattern="[А-Яа-яЁё]{6,}, [0-9]{1,}" id="address" value="${address}" required/>
                    </li>
                    <li>
                        <label for="city">Город</label>
                        <input type="text" name="city" id="city" pattern="[А-Яа-яЁё]{3,}" value="${city}" required/>
                    </li>
                    <li>
                        <label for="postalCode">Почтовый индекс</label>
                        <input type="text" name="postalCode" pattern="[0-9]{6}" id="postalCode" value="${postalCode}" required/>
                    </li>
                    <li>
                        <label for="country">Страна</label>
                        <input type="text" name="country" id="country" pattern="[А-Яа-яЁё]{3,}" value="${country}" required/>
                    </li>
                    <li> 
                        <button type="submit" class="to-cart">Продолжить</button>
                    </li>
                </ul>
            </form>
        </div>
   `;
    }
}

export default ShippingScreen;