import CheckoutSteps from "../components/checkoutSteps";
import { getUserInfo, setPayment } from "../localStorage";

const PaymentScreen = {
    after_render: () => {
        document.getElementById("payment-form").addEventListener('submit', async (e) => {
            e.preventDefault();
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
            setPayment({paymentMethod});
            document.location.hash = '/placeorder';
        })
    },
    render: () => {
        const {name} = getUserInfo();
        if(!name) {
            document.location.hash = '/';
        }
        return `
        ${CheckoutSteps.render({step1: true, step2: true, step3:true})}
        <div class="form-container">
            <form id="payment-form">
                <ul class="form-items">
                    <li>
                        <h1>Оплата</h1>
                    </li>
                    <li>
                        <div>
                            <input type="radio" name="payment-method" id="paypal" value="Paypal" checked/>
                            <label for="paypal">Paypal</label>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input type="radio" name="payment-method" id="stripe" value="Stripe"/>
                            <label for="stripe">Наличными при получении</label>
                        </div>
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

export default PaymentScreen;