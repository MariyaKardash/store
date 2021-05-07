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
                : `                <a href="/#/signin">Авторизация</a>`
            }
                <a href="/#/cart">Корзина</a>
                ${isAdmin ? `<a href="/#/manage">Управление магазином</a>`: ''}
            </div>`;
  },
  after_render: () => {},
};
export default Header;
