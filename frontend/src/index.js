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
import OrderListScreen from "./screens/OrderListScreen.js";
import PayCartScreen from "./screens/PayCartScreen.js";
import SearchScreen from "./screens/SearchScreen.js";
import FilterScreen from "./screens/FilterScreen.js";
import SortScreen from "./screens/SortScreen.js";
import ExpertScreen from "./screens/ExpertScreen.js";

const routes = {
  "/": HomeScreen,
  "/product/:id/edit": ProductEditScreen,
  "/product/:id": ProductScreen,
  "/order/:id": OrderScreen,
  "/cart/:id": CartScreen,
  "/cart": CartScreen,
  "/signin": SigninScreen,
  "/register": RegisterScreen,
  "/profile": ProfileScreen,
  "/shipping": ShippingScreen,
  "/payment": PaymentScreen,
  "/paycart": PayCartScreen,
  "/placeorder": PlaceOrderScreen,
  "/manage": ManageScreen,
  "/productlist": ProductListScreen,
  "/orderlist": OrderListScreen,
  "/search/:id": SearchScreen,
  "/filter/:id": FilterScreen,
  "/sort/:id/ascending": SortScreen,
  "/sort/:id/descending": SortScreen,
  "/expert": ExpertScreen,
  "/expert/:id": ExpertScreen,
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
  const header = document.getElementById("header-container");
  header.innerHTML = await Header.render();
  await Header.after_render();
  const main = document.getElementById("main_container");
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
  hideLoading();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
