import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

const RegisterScreen = {
    after_render: () => {
        document.getElementById("register-form").addEventListener('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await register({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            });
            hideLoading();
            if(data.error) {
                showMessage(data.error);
            } else {
                setUserInfo(data);
                redirectUser();
            }
        })
    },
    render: () => {
        if(getUserInfo().name) {
            redirectUser();
        }
        return `
        <div class="form-container">
            <form id="register-form">
                <ul class="form-items">
                    <li>
                        <h1>Регистрация</h1>
                    </li>
                    <li>
                        <label for="name">Имя</label>
                        <input type="name" name="name" id="name" required/>
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" required/>
                    </li>
                    <li>
                        <label for="password">Пароль</label>
                        <input type="password" name="password" id="password" required/>
                    </li>
                    <li> 
                        <button type="submit" class="to-cart">Зарегистрироваться</button>
                    </li>
                    <li>
                        <div>
                            Уже есть аккаунт?
                            <a href="/#/signin">Войти.</a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
   `;
    }
}

export default RegisterScreen;