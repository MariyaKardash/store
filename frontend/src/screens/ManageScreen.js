import { getSummary } from "../api";
import ManageMenu from "../components/manageMenu";

let summary = {};

const ManageScreen = {
    after_render: () => {},
    render: async () => {
        summary = await getSummary();
        return `
        <div class="manage">
            ${ManageMenu.render({selected:'manage'})}
            <div class="manage-content">
                <h1>Статистика</h1>
                <ul class="summary-items">
                <li>
                  <div class="summary-title color1">
                     <span><i class="fa fa-users"></i> Пользователи</span>
                  </div>
                  <div class="summary-body">${summary.users[0].numUsers}</div>
                </li>
                <li>
                  <div class="summary-title color2">
                     <span><i class="fa fa-users"></i> Заказы</span>
                  </div>
                  <div class="summary-body">${summary.orders[0].numOrders}</div>
                </li>
                <li>
                  <div class="summary-title color3">
                     <span><i class="fa fa-users"></i> Продажи</span>
                  </div>
                  <div class="summary-body">$${summary.orders[0].totalSales}</div>
                </li>
              </ul>
            </div>
        </div>
        `
    }
}

export default ManageScreen;