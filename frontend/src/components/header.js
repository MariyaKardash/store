import { getUserInfo } from "../localStorage";

const Header = {
  render: () => {
    const { name } = getUserInfo();
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
            </div>`;
  },
  after_render: () => {},
};
export default Header;
