import { getProduct } from "../api";
import { getCompareItems, setCompareItems } from "../localStorage";
import { parseRequestURL, rerender } from "../utils";

const addToCompare = (item, forceUpdate = false) => {
    let compareItems = getCompareItems();
    const existItem = compareItems.find(x => x.product === item.product);
    if(existItem) {
        if(forceUpdate) {
            compareItems = compareItems.map((x) => x.product === existItem.product ? item : x);
        }
    } else {
        compareItems = [...compareItems, item];
    }
    setCompareItems(compareItems);
    if(forceUpdate) {
        rerender(ExpertScreen);
    }
};

const removeFromCompare = (id) => {
    setCompareItems(getCompareItems().filter(x => x.product !== id));
    if(id === parseRequestURL().id) {
        document.location.hash = '/expert';
    } else {
        rerender(ExpertScreen);
    }
}



const ExpertScreen = {
    after_render: () => {
        const qtySelects = document.getElementsByClassName('qty-select');
        Array.from(qtySelects).forEach((qtySelect) => {
          qtySelect.addEventListener('change', (e) => {
            const item = getCompareItems().find((x) => x.product === qtySelect.id);
            addToCompare({ ...item, qty: Number(e.target.value) }, true);
          });
        });

        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach(deleteButton => {
            deleteButton.addEventListener('click', () => {
                removeFromCompare(deleteButton.id);
            })
        })
    },
    render: async () => {
        const request = parseRequestURL();
        if(request.id) {
            const product = await getProduct(request.id);
            addToCompare({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                // screenResolution: product.operationSystem,
                // operationSystem: product.operationSystem,
                // cores: product.cores,
                // memory: product.memory,
                // camera: product.camera,
                // battery: product.battery,
            })
        }

        const compareItems = getCompareItems();
        return `
        <div class="content compare">
          <div class="compare-list">
            <ul class="compare-list-container">
              ${
                compareItems.length === 0
                  ? '<div>Ваш список сравнений пуст! <a href="/#/">Пополнить список</a>'
                  : compareItems
                      .map(
                        (item) => `
                <li>
                <div>
                <button type="button" class="delete-button to-cart" id="${
                  item.product
                }">
                Убрать из сравнения
                </button>
              </div>
                  <div class="compare-image">
                    <img src="${item.image}" alt="${item.name}" />
                  </div>
                  <div class="compare-name">
                    <div>
                      <a href="/#/product/${item.product}">
                        ${item.name}
                      </a>
                    </div>
                  </div>
                </li>
                `)
                      .join('\n')
              } 
            </ul>
          </div>
        </div>
        `;
    },
};

export default ExpertScreen;