import { getUserInfo } from "../localStorage";

const Header = {
  render: () => {
    const { name, isAdmin } = getUserInfo();
    return `
            <div class="brand">
                <a href="/#/">Shop</a>
            </div>
            <div>
            ${
              name
                ? `<a href = '/#/profile'>${name}</a>`
                : `                <a href="/#/signin"><i class="fas fa-user-cog" data-title="Авторизоваться"></i></a>`
            }
                <a href="/#/cart"><i class="fas fa-shopping-cart" data-title="Корзина"></i></a>
                ${isAdmin ? `<a href="/#/manage"><i class="fas fa-chart-bar" data-title="Управление магазином"></i></a>`: ''}
            </div>`;
  },
  after_render: () => {},
};
export default Header;
