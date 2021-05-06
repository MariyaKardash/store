import Header from "./components/header.js";
import CartScreen from "./screens/CartScreen.js";
import ErrorScreen from "./screens/ErrorScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import SigninScreen from "./screens/SigninScreen.js";
import { hideLoading, parseRequestURL, showLoading } from "./utils.js";

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/cart/:id": CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
  '/shipping': ShippingScreen,
  '/payment': PaymentScreen,
};

const router = async () => {
  showLoading();
  const request = parseRequestURL();
  const parseUrl =
    (request.resourse ? `/${request.resourse}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
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
