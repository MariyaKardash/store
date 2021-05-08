import { getOrders } from "../api"
import ManageMenu from "../components/manageMenu";

const OrderListScreen = {
    after_render: () => {},
    render: async () => {
        const orders = await getOrders();
        return `
        <div class="manage">
            ${ManageMenu.render({selected: 'orders'})}
            <div class="manage-content">
                <h1>Заказы</h1>
                <div class='order-list'>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Дата</th>
                                <th>Цена</th>
                                <th>Пользователь</th>
                                <th>Оплачено</th>
                                <th>Доставлено</th>
                                <th class='tr-action'></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.map((order) => `
                                <tr>
                                    <td>${order._id}</td>
                                    <td>${order.createdAt}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>${order.user.name}</td>
                                    <td>${order.paidAt || 'Нет'}</td>
                                    <td>${order.deliveredAt || 'Нет'}</td>
                                    <td>
                                        <button id="${order._id}" class="edit-button">Изменить</button>
                                        <button id="${order._id}" class="delete-button">Удалить</button>
                                    </td>
                                </tr>
                            `).join('\n')
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `
    }
};

export default OrderListScreen;