import { getUserInfo } from "../localStorage";

const Header = {
  after_render: () => {
    document.getElementById("open-modal").addEventListener("click", () => {
      document.getElementById("modal").style.display = "block";
    });
    document.getElementById("close-modal").addEventListener("click", () => {
      document.getElementById("modal").style.display = "none";
    });
    document.getElementById("search-icon").addEventListener("click", () => {
      if(document.getElementById("search").value == '') {
        document.location.hash = '/';
      } else {
              document.location.hash = `/search/${
        document.getElementById("search").value
      }`;
      }
    });
  },
  render: () => {
    const { name, isAdmin } = getUserInfo();
    return `
    <div id="modal" class="modal-categories">
    <div class="modal-header">
    Категории
    <i class="fas fa-times" id="close-modal"></i>
    </div>
      <ul class='modal-content'>
        <li>
          <a href="/#/filter/phones">Телефоны</a>
        </li>
        <li>
          <a href="/#/filter/laptops">Ноутбуки</a>
        </li>
      </ul>
    </div>
            <div id='open-modal'>
              <a><i class="fas fa-bars"></i></a>
            </div>
            <div class="brand">
                <a href="/#/">Shop</a>
            </div>
            <div class="header-ref">
            <input class="search-input" id="search" placeholder="Поле для поиска..."/>
            <a><i class="fas fa-search" id="search-icon"></i></a>
            ${
              name
                ? `<a href = '/#/profile'>${name}</a>`
                : `<a href="/#/signin"><i class="fas fa-user-cog" data-title="Авторизоваться"></i></a>`
            }
                <a href="/#/cart"><i class="fas fa-shopping-cart" data-title="Корзина"></i></a>
                ${
                  isAdmin
                    ? `<a href="/#/manage"><i class="fas fa-chart-bar" data-title="Управление магазином"></i></a>`
                    : ""
                }
            </div>`;
  },
};
export default Header;
