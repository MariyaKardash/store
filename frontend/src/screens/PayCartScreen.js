import CheckoutSteps from "../components/checkoutSteps";
import { getPayCart, getUserInfo, setPayCart } from "../localStorage";

const PayCartScreen = {
    after_render: () => {
        document.getElementById("payCart-form").addEventListener('submit', async (e) => {
            e.preventDefault();
                setPayCart({
                    number: document.getElementById('number').value,
                    date: document.getElementById('date').value,
                    owner: document.getElementById('owner').value,
                    CVV: document.getElementById('CVV').value,
            });
            document.location.hash = '/placeorder';
        })
    },
    render: () => {
        const {name} = getUserInfo();
        if(!name) {
            document.location.hash = '/';
        }
        const {number, date, owner, CVV} = getPayCart();
        return `
        ${CheckoutSteps.render({step1: true, step2: true, step3:true})}
        <div class="form-container">
            <form id="payCart-form">
                <ul class="form-items">
                    <li>
                        <h1>Оплата картой</h1>
                    </li>
                    <li>
                        <label for="number">Номер карты</label>
                        <input type="text" name="number" pattern="[0-9]{16}" id="number" value="${number}" required/>
                    </li>
                    <li>
                        <label for="date">Срок действия</label>
                        <input type="text" name="date" pattern="[0-9]{2}/[0-9]{2}" id="date" value="${date}" required/>
                    </li>
                    <li>
                        <label for="owner">Владелец</label>
                        <input type="text" name="owner" id="owner" value="${owner}" required/>
                    </li>
                    <li>
                        <label for="CVV">CVV/CVC</label>
                        <input type="password" name="CVV" pattern="[0-9]{3}" id="CVV" value="${CVV}" required/>
                    </li>
                    <li> 
                        <button type="submit" class="to-cart">Оплатить</button>
                    </li>
                </ul>
            </form>
        </div>
   `;
    }
}

export default PayCartScreen;