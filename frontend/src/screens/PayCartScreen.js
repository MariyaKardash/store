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
                        <input type="number" name="number" id="number" value="${number}"/>
                    </li>
                    <li>
                        <label for="date">Срок действия</label>
                        <input type="text" name="date" id="date" value="${date}"/>
                    </li>
                    <li>
                        <label for="owner">Владелец</label>
                        <input type="text" name="owner" id="owner" value="${owner}"/>
                    </li>
                    <li>
                        <label for="CVV">CVV/CVC</label>
                        <input type="number" name="CVV" id="CVV" value="${CVV}"/>
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