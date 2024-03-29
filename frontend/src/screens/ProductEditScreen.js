import { getProduct, updateProduct } from "../api";
import { hideLoading, parseRequestURL, showLoading, showMessage } from "../utils";


const ProductEditScreen = {
    after_render: () => {
        const request = parseRequestURL();
        document.getElementById('edit-product-form').addEventListener('submit', async (e)=> {
            e.preventDefault();
            showLoading();
            const data = await updateProduct({
                _id: request.id,
          name: document.getElementById('name').value,
          price: document.getElementById('price').value,
          image: document.getElementById('image').value,
          brand: document.getElementById('brand').value,
          category: document.getElementById('category').value,
          countInStock: document.getElementById('countInStock').value,
          description: document.getElementById('description').value,
          operationSystem: document.getElementById('operationSystem').value,
          screenResolution: document.getElementById('screenResolution').value,
          cores: document.getElementById('cores').value,
          camera: document.getElementById('camera').value,
          memory: document.getElementById('memory').value,
          battery: document.getElementById('battery').value,
            });
            hideLoading();
            if(data.error) {
                showMessage(data.error);
            } else {
                document.location.hash='/productlist';
            }
        })
    },
    render: async () => {
        const request = parseRequestURL();
        const product = await getProduct(request.id);
        return `
        <div class="content">
            <div>
                <a href="/#/productlist"><i class="fas fa-angle-double-left"></i></a>
            </div>
            <div class="form-container">
                <form id='edit-product-form'>
                    <ul class="form-items">
                        <li>
                            <h1> Изменение товара ${product._id.substring(0, 8)}</h1>
                        </li>
                        <li>
                            <label for='name'>Название</label>
                            <input type="text" name="name" value="${product.name}" id='name' required/>
                        </li>
                        <li>
                            <label for='price'>Цена</label>
                            <input type="text" name="price" pattern="[0-9]{1,}" value="${product.price}" id='price' required/>
                        </li>
                        <li>
                            <label for='image'>Изображение</label>
                            <input type="text" name="image" value="${product.image}" id='image' required/>
                        </li>
                        <li>
                            <label for='brand'>Фирма-изготовитель</label>
                            <input type="text" name="brand" value="${product.brand}" id='brand' required/>
                        </li>
                        <li>
                            <label for='countInStock'>Количество в наличии</label>
                            <input type="text" name="countInStock" pattern="[0-9]{1,}" value="${product.countInStock}" id='countInStock' required/>
                        </li>
                        <li>
                            <label for='category'>Категория</label>
                            <input type="text" name="category" value="${product.category}" id='category' required/>
                        </li>
                        <li>
                            <label for='description'>Описание</label>
                            <input type="text" name="description" value="${product.description}" id='description' required/>
                        </li>
                        <li>
                            <label for='operationSystem'>Операционная система</label>
                            <input type="text" name="operationSystem" pattern="[A-Za-z]{1,}" value="${product.operationSystem}" id='operationSystem' required/>
                        </li>
                        <li>
                            <label for='screenResolution'>Разрешение экрана</label>
                            <input type="text" name="screenResolution" pattern="[0-9]{1,}x[0-9]{1,}" value="${product.screenResolution}" id='screenResolution' required/>
                        </li>
                        <li>
                            <label for='cores'>Количество ядер</label>
                            <input type="text" name="cores" pattern="[0-9]{1,}" value="${product.cores}" id='cores' required/>
                        </li>
                        <li>
                            <label for='camera'>Разрешение камеры</label>
                            <input type="text" name="camera" pattern="[0-9]{1,}" value="${product.camera}" id='camera' required/>
                        </li>
                        <li>
                            <label for='memory'>Объём памяти</label>
                            <input type="text" name="memory" pattern="[0-9]{1,}" value="${product.memory}" id='memory' required/>
                        </li>
                        <li>
                            <label for='battery'>Объём батареи</label>
                            <input type="text" name="battery" pattern="[0-9]{1,}" value="${product.battery}" id='battery' required/>
                        </li>
                        <li>
                            <button type="submit" class="to-cart">Изменить</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        `
    }
};

export default ProductEditScreen;