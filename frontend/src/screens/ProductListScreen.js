import { createProduct, deleteProduct, getProducts } from '../api';
import ManageMenu from '../components/manageMenu';
import { hideLoading, rerender, showLoading } from '../utils';

const ProductListScreen = {
    after_render: () => {
        document.getElementById('create-product-button').addEventListener('click', async() => {
            const data = await createProduct();
            document.location.hash = `/product/${data.product._id}/edit`;
        });

        const editButtons = document.getElementsByClassName('edit-button');
        Array.from(editButtons).forEach((editButton) => {
            editButton.addEventListener('click', () => {
                document.location.hash = `/product/${editButton.id}/edit`
            })
        });

        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach((deleteButton) => {
            deleteButton.addEventListener('click', async () => {
                if(confirm('Вы уверены, что хотите удалить этот товар?')) {
                    showLoading();
                    const data = await deleteProduct(deleteButton.id);
                    if (data.error) {
                        showMessage(data.error);
                      } else {
                        rerender(ProductListScreen);
                      }
                    hideLoading();
                }
            })
        })
    },

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