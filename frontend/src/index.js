import Header from "./components/header.js";
import CartScreen from "./screens/CartScreen.js";
import ErrorScreen from "./screens/ErrorScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";
import OrderScreen from "./screens/OrderScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import SigninScreen from "./screens/SigninScreen.js";
import { hideLoading, parseRequestURL, showLoading } from "./utils.js";
import ManageScreen from "./screens/ManageScreen.js";
import ProductListScreen from "./screens/ProductListScreen.js";
import ProductEditScreen from "./screens/ProductEditScreen.js";

const routes = {
  "/": HomeScreen,
  '/product/:id/edit':ProductEditScreen,
  "/product/:id": ProductScreen,
  '/order/:id': OrderScreen,
  "/cart/:id": CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
  '/shipping': ShippingScreen,
  '/payment': PaymentScreen,
  '/placeorder': PlaceOrderScreen,
  '/manage': ManageScreen,
  '/productlist': ProductListScreen,
};

const router = async () => {
  showLoading();
  const request = parseRequestURL();
  const parseUrl =
    (request.resourse ? `/${request.resourse}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
    console.log(request);
    const screen = routes[parseUrl] ? routes[parseUrl] : ErrorScreen;

    const header = document.getElementById('header-container');
    header.innerHTML = await Header.render();
    await Header.after_render();
    const main = document.getElementById("main_container");
    main.innerHTML = await screen.render();
    if (screen.after_render) await screen.after_render();
    hideLoading();
};

window.addEventListener("load", router);
window.addEventListener('hashchange', router);
