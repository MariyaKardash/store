import CartScreen from "./screens/CartScreen.js";
import ErrorScreen from "./screens/ErrorScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import SigninScreen from "./screens/SigninScreen.js";
import { parseRequestURL } from "./utils.js";

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/cart/:id": CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
};

const router = async () => {
  const request = parseRequestURL();
  const parseUrl =
    (request.resourse ? `/${request.resourse}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
    const screen = routes[parseUrl] ? routes[parseUrl] : ErrorScreen;

  const main = document.getElementById("main_container");
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
};

window.addEventListener("load", router);
window.addEventListener('hashchange', router);
