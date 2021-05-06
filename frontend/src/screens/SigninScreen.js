import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";

const SigninScreen = {
    after_render: () => {
        document.getElementById("signin-form").addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = await signin({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            });
            if(data.error) {
                alert(data.error);
            } else {
                setUserInfo(data);
                document.location.hash = '/';
            }
        })
    },
    render: () => {
        if(getUserInfo().name) {
            document.location.hash = '/';
        }
        return `
        <div class="form-container">
            <form id="signin-form">
                <ul class="form-items">
                    <li>
                        <h1>Вход в систему</h1>
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email"/>
                    </li>
                    <li>
                        <label for="password">Пароль</label>
                        <input type="password" name="password" id="password"/>
                    </li>
                    <li> 
                        <button type="submit" class="to-cart">Войти</button>
                    </li>
                    <li>
                        <div>
                            Ещё не зарегистрированы?
                            <a href="/#/register">Зарегистрироваться.</a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
   `;
    }
}

export default SigninScreen;