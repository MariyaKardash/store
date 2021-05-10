import { getMyOrders, update } from "../api";
import { getUserInfo, setUserInfo, clearUser } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const ProfileScreen = {
    after_render: () => {
        document.getElementById('signout-button').addEventListener('click', () => {
            clearUser();
            document.location.hash = '/';
        })
        document.getElementById("profile-form").addEventListener('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await update({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            });
            hideLoading();
            if(data.error) {
                showMessage(data.error);
            } else {
                setUserInfo(data);
                document.location.hash = '/';
            }
        })
    },
    render: async () => {
        const {name, email} = getUserInfo();
        if(!name) {
            document.location.hash = '/';
        }
        const orders = await getMyOrders();
        return `
        <div class="content profile">
            <div class="profile-info">
                <div class="form-container">
                    <form id="profile-form">
                        <ul class="form-items">
                            <li>
                                <h1>Ваши данные</h1>
                            </li>
                            <li>
                                <label for="name">Имя</label>
                                <input type="name" name="name" id="name" value="${name}"/>
                            </li>
                            <li>
                                <label for="email">Email</label>
                                <input type="email" name="email" id="email" value="${email}"/>
                            </li>
                            <li>
                                <label for="password">Пароль</label>
                                <input type="password" name="password" id="password"/>
                            </li>
                            <li> 
                                <button type="submit" class="to-cart">Изменить</button>
                            </li>
                            <li> 
                            <button type="button" id="signout-button" class="to-cart">Выйти</button>
                        </li>
                        </ul>
                    </form>
                </div>
            </div>
            <div class="profile-orders">
            <h2>История заказов</h2>
                <table>
                    <thead>
                        <tr>
                            <th>№ заказа</th>
                            <th>Дата</th>
                            <th>Цена</th>
                            <th>Оплачено</th>
                            <th>Доставлено</th>
                            <th>Ссылка</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.length === 0 ? `<tr><td colspan ="6">На данный момент у вас нет доступных заказов.</td></tr>` : 
                    orders.map(order => 
                        `
                            <tr>
                                <td>${order._id}</td>
                                <td>${order.createdAt}</td>
                                <td>${Math.round(order.totalPrice)}</td>
                                <td>${order.paidAt || 'Нет'}</td>
                                <td>${order.deliveredAt || 'Нет'}</td>
                                <td><a href='/#/order/${order._id}'><button class='to-cart'>Перейти к заказу</button></a></td>
                            </tr>
                        `
                    ).join('\n')
                }
                    </tbody>
                </table>
            </div>
        </div>
        
   `;
    }
}

export default ProfileScreen;