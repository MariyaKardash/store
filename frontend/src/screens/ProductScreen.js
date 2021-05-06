import { getProduct } from "../api";
import Rating from "../components/rating";
import { hideLoading, parseRequestURL, showLoading } from "../utils";

const ProductScreen = {
    after_render: () => {
        const request = parseRequestURL();
        document.getElementById("add-button").addEventListener('click', () => {
            document.location.hash = `/cart/${request.id}`
        })
    },
  render: async () => {
    const request = parseRequestURL();
    showLoading();
    const product = await getProduct(request.id);
    if (product.err) {
      return `<div>Возникла ошибка! Проверьте адрес страницы!</div>`;
    }
    hideLoading();
    return `
        <div class="content">
            <div class="return-in-menu">
                <a href='/#/'>Вернуться</a>
            </div>
            <div class='details'> 
                <div class='details-image'>
                    <img src="${product.image}" alt="${product.name}" />
                </div>
                <div class='details-info'>
                    <ul>
                        <li>
                            <h1>${product.name}</h1>
                        </li>
                        <li>
                            ${Rating.render({
                              value: product.rating,
                              text: `${product.numReviews} отзывов`,
                            })}
                        </li>
                        <li>
                            Цена: <strong>$${product.price}</strong>
                        </li>
                        <li> 
                            Описание: 
                            <div>
                            ${product.description}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="details-action">
                    <ul>
                        <li>
                            Цена: $${product.price}
                        </li>
                        <li>
                            Статус: 
                            ${
                              product.countInStock > 0
                                ? `<span class='success'>В наличии</span>`
                                : `<span class='error'>Отсутствует</span>`
                            }
                        </li>
                        <li>
                            <button id="add-button" class="full-width to-cart">Добавить в корзину </button>
                    </ul>
                </div>
            </div>
        </div>`;
  },
};
export default ProductScreen;
