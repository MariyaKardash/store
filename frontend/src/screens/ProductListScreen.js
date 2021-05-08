import { getProducts } from '../api';
import ManageMenu from '../components/manageMenu';

const ProductListScreen = {
    after_render: () => {},
    render: async () => {
        const products = await getProducts();
        return `
        <div class="manage">
            ${ManageMenu.render({selected: 'products'})}
            <div class="manage-content">
                <h1>Товары</h1>
                <button id="create-product-button" class="to-cart"> Добавить товар </button>
                <div class="product-list">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Название</th>
                                <th>Цена</th>
                                <th>Категория</th>
                                <th>Бренд</th>
                                <th class="tr-action"></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${products.map((product) => `
                            <tr>
                                <td>${product._id}</td>
                                <td>${product.name}</td>
                                <td>${product.price}</td>
                                <td>${product.category}</td>
                                <td>${product.brand}</td>
                                <td>
                                    <button id='${product._id}' class='edit-button'>Изменить</button>
                                    <button id='${product._id}' class='delete-button'>Удалить</button>
                                </td>
                            </tr>
                            `).join('\n') }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `
    }
}

export default ProductListScreen;