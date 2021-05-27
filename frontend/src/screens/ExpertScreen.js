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

let firstWeight = 0, secondWeight = 0;

const ExpertScreen = {
    after_render: () => {
      var textFile = null,
      makeTextFile = function (text) {
      var data = new Blob([text], {type: 'text/plain'});
      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }
      textFile = window.URL.createObjectURL(data);

      return textFile;
    };

    var download = document.getElementById('download');

    download.addEventListener('click', function () {
      var link = document.createElement('a');
      const items = getCompareItems();
      link.setAttribute('download', `compare(${items[0].name}_${items[1].name}).txt`);
      link.href = makeTextFile(`
      _______________________________________________________
      |Название товаров  |    ${items[0].name}    ||    ${items[1].name}   |
      |Разрешение экрана |     ${items[0].screenResolution}    ||     ${items[1].screenResolution}   |
      |Количество ядер   |        ${items[0].cores}        ||        ${items[1].cores}       |
      |Качество камеры   |        ${items[0].camera}       ||        ${items[1].camera}      |
      |Объём памяти      |       ${items[0].memory}       ||       ${items[1].memory}      |
      |Объём батареи     |       ${items[0].battery}      ||       ${items[1].battery}     |
      _______________________________________________________
      
      Итоговые значения:
      ${items[0].name}: ${firstWeight}
      ${items[1].name}: ${secondWeight}

      
      ${firstWeight > secondWeight ? `${items[0].name} лучше!` : `${items[1].name} лучше!`}`);
      document.body.appendChild(link);

      window.requestAnimationFrame(function () {
        var event = new MouseEvent('click');
        link.dispatchEvent(event);
        document.body.removeChild(link);
      });

  }, false);
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
                category: product.category,
                screenResolution: product.screenResolution,
                cores: product.cores,
                memory: product.memory,
                camera: product.camera,
                battery: product.battery,
            })
        }

        let compareKeys = ['cores', 'memory', 'battery', 'camera', 'screenResolution'];

        const compareItems = getCompareItems();
        if(compareItems.length < 2) {
          return `
          <div class="content compare">
          <div> Мало товаров для сравнения!</div>
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
                    <div class="compare-content">
                    <div>
                    Разрешение экрана:
                        ${item.screenResolution}
                    </div>
                    <div>
                    <div>
                    Количество ядер:
                        ${item.cores}
                    </div>
                    <div>
                    Объём памяти:
                        ${item.memory}
                    </div>
                    <div>
                    Качество камеры:
                        ${item.camera}
                    </div>
                    <div>
                    Объём батареи:
                        ${item.battery}
                    </div>
                  </div>
                </li>
                `)
                      .join('\n')
              } 
            </ul>
          </div>
        </div>`
        }
        let firstItem = compareItems[0];
        let secondItem = compareItems[1];

        if(firstItem.category !== secondItem.category) {
          return `
          <div class="content compare">
          <div>Нельзя сравнивать товары, взятые из разных категорий!</div>
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
      </div>`
        }

        firstWeight = 0;
        secondWeight = 0;
        let finalItem = {};

        for(let key of Object.keys(firstItem)) {
           if(secondItem[key] > firstItem[key]) {
          finalItem[key] = secondItem[key];
        } else {
          finalItem[key] = firstItem[key];
        }
        if(key === 'screenResolution') {
          let firstScreen = firstItem.screenResolution.split('x');
          let secondScreen = secondItem.screenResolution.split('x');
          if(+firstScreen[0] > +secondScreen[0]) {
            finalItem[key] = firstItem[key];
          } else if(+firstScreen[0] < +secondScreen[0]) {
            finalItem[key] = secondItem[key];
          }
        }
      }

      for(let key of compareKeys) {
        if(secondItem[key] === firstItem[key]) {
          secondWeight+=1;
          firstWeight+=1;
        } else {
          if(secondItem[key] === finalItem[key]) {
            secondWeight+=1.5;
            firstWeight+=0.5;
          }
          if(firstItem[key] === finalItem[key]) {
            firstWeight+=1.5;
            secondWeight+=0.5;
          }
        }
      }

      let finalWeight;
      if(firstWeight>secondWeight) {
        finalWeight = firstWeight;
      } else {
        finalWeight = secondWeight;
      }
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
                    <div class="compare-content">
                    <div>
                    Разрешение экрана:
                        ${item.screenResolution === finalItem.screenResolution ? `<div class='success'>${item.screenResolution}</div>` : `<div class='error'>${item.screenResolution}</div>`}
                    </div>
                    <div>
                    Количество ядер:
                    ${item.cores < finalItem.cores ? `<div class='error'>${item.cores}</div>` : `<div class='success'>${item.cores}</div>`}
                    </div>
                    <div>
                    Объём памяти:
                    ${item.memory < finalItem.memory ? `<div class='error'>${item.memory} Гб</div>` : `<div class='success'>${item.memory} Гб</div>`}
                    </div>
                    <div>
                    Качество камеры:
                    ${item.camera < finalItem.camera ? `<div class='error'>${item.camera} Мб</div>` : `<div class='success'>${item.camera} Мб</div>`}
                    </div>
                    <div>
                    Объём батареи:
                    ${item.battery < finalItem.battery ? `<div class='error'>${item.battery} mAh</div>` : `<div class='success'>${item.battery} mAh</div>`}
                    </div>
                    <div> 
                    ${item === firstItem ? `<div class="weight">Итоговое значение: ${firstWeight}</div>` : `<div class="weight">Итоговое значение: ${secondWeight}</div>`}
                    ${finalWeight === firstWeight && item === firstItem ? `<div class='best success'>Данный товар лучше!</div>`:``}
                    ${finalWeight === secondWeight && item === secondItem ? `<div class='best success'>Данный товар лучше!</div>`:`<div></div>`}
                    </div>
                  </div>
                </li>
                `)
                      .join('\n')
              } 
            </ul>
            <button id="download" class="download to-cart">Скачать отчёт</button>
          </div>
        </div>
        `;
    },
};

export default ExpertScreen;