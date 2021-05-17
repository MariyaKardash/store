export const getCartItems = () => {
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  return cartItems;
};

export const setCartItems = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const getCompareItems = () => {
  const compareItems = localStorage.getItem("compareItems")
    ? JSON.parse(localStorage.getItem("compareItems"))
    : [];
  return compareItems;
};

export const setCompareItems = (compareItems) => {
  localStorage.setItem("compareItems", JSON.stringify(compareItems));
};

export const setUserInfo = ({
  _id = "",
  name = "",
  email = "",
  password = "",
  token = "",
  isAdmin = false,
}) => {
  localStorage.setItem(
    "userInfo",
    JSON.stringify({ _id, name, email, password, token, isAdmin })
  );
};

export const clearUser = () => {
  localStorage.removeItem("userInfo");
};

export const getUserInfo = () => {
  return localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : { name: "", email: "", password: "" };
};

export const getShipping = () => {
  const shipping = localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : {
        address: "",
        city: "",
        postalCode: "",
        country: "",
      };

  return shipping;
};

export const setShipping = ({
  address = "",
  city = "",
  postalCode = "",
  country = "",
}) => {
  localStorage.setItem(
    "shipping",
    JSON.stringify({ address, city, postalCode, country })
  );
};

export const getPayCart = () => {
  const payCart = localStorage.getItem("payCart")
    ? JSON.parse(localStorage.getItem("payCart"))
    : {
        number: "",
        date: "",
        owner: "",
        CVV: "",
      };

  return payCart;
};

export const setPayCart = ({
  number = "",
  date = "",
  owner = "",
  CVV = "",
}) => {
  localStorage.setItem("payCart", JSON.stringify({ number, date, owner, CVV }));
};

export const getPayment = () => {
  const payment = localStorage.getItem("payment")
    ? JSON.parse(localStorage.getItem("payment"))
    : {
        paymentMethod: "Картой",
      };

  return payment;
};

export const setPayment = ({ paymentMethod = "Картой" }) => {
  localStorage.setItem("payment", JSON.stringify({ paymentMethod }));
};

export const cleanCart = () => {
  localStorage.removeItem("cartItems");
};
