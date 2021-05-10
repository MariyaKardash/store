import Chartist from 'chartist';
import { getSummary } from "../api";
import ManageMenu from "../components/manageMenu";

let summary = {};

const ManageScreen = {
    after_render: () => {
        new Chartist.Line(
          '.ct-chart-line',
          {
            labels: summary.dailyOrders.map((x) => x._id),
            series: [summary.dailyOrders.map((x) => x.sales)],
          },
          {
            showArea: true,
          }
        );
        new Chartist.Pie(
          '.ct-chart-pie',
          {
            labels: summary.productCategories.map((x) => x._id),
            series: summary.productCategories.map((x) => x.count),
          },
          {
            donut: true,
            donutWidth: 60,
            startAngle: 270,
            showLabel: true,
            donutSolid: true,
          }
        );
      },
    render: async () => {
        summary = await getSummary();
        return `
        <div class="manage">
            ${ManageMenu.render({selected:'manage'})}
            <div class="manage-content">
                <h1>Статистика</h1>
                <ul class="summary-items">
                <li>
                  <div class="summary-title">
                     <span><i class="fa fa-users"></i> Пользователи</span>
                  </div>
                  <div class="summary-body">${summary.users[0].numUsers}</div>
                </li>
                <li>
                  <div class="summary-title">
                     <span><i class="fa fa-users"></i> Заказы</span>
                  </div>
                  <div class="summary-body">${summary.orders[0].numOrders}</div>
                </li>
                <li>
                  <div class="summary-title">
                     <span><i class="fa fa-users"></i> Продажи</span>
                  </div>
                  <div class="summary-body">$${summary.orders[0].totalSales}</div>
                </li>
              </ul>
              <div class="charts">
          <div>
            <h2>Продажи</h2>
            <div class="ct-perfect-fourth ct-chart-line"></div>
          </div>
          <div>
            <h2>Категории</h2>
            <div class="ct-perfect-fourth ct-chart-pie"></div>
          </div>
        </div>  
            </div>
        </div>
        `
    }
}

export default ManageScreen;