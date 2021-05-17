import { getProduct } from "../api";
import Rating from "../components/rating";
import { getCompareItems } from "../localStorage";
import { hideLoading, parseRequestURL, showLoading, showMessage } from "../utils";

const ProductScreen = {
    after_render: () => {
        const request = parseRequestURL();
        document.getElementById("add-button").addEventListener('click', () => {
            document.location.hash = `/cart/${request.id}`
        })
        document.getElementById("compare-button").addEventListener('click', () => {
            console.log(getCompareItems().length);
            if(getCompareItems().length > 1 ) {
                console.log('hi')
                showMessage('Слишком много товаров в сравнении! Удалите что-нибудь для продолжения!')
                document.location.hash = `/expert/`;
            } else {
                document.location.hash = `/expert/${request.id}`
            }
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
                <a href='/#/'><i class="fas fa-angle-double-left"></i></a>
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
                        <li> 
                            Описание: 
                            <div>
                            ${product.description}
                            </div>
                        </li>
                    </ul>
                <div class="details-action">
                    <ul>
                        <li>
                            $${product.price}
                        </li>
                        <li>
                            ${
                              product.countInStock > 0
                                ? `<span class='success'>Есть в наличии</span>`
                                : `<span class='error'>Отсутствует на складе</span>`
                            }
                        </li>
                        <li>
                            <button id="add-button" class="full-width to-cart">Добавить в корзину </button>
                             <button id="compare-button" class="full-width to-cart">Добавить в сравнение</button>
                    </ul>
                </div>
                </div>
            </div>
        </div>`;
  },
};
export default ProductScreen;
