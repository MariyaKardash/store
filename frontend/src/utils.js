import { getCartItems } from "./localStorage";

export const parseRequestURL = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split("/");
  return {
    resourse: request[1],
    id: request[2],
    verb: request[3],
  };
};

export const rerender = async (component) => {
  document.getElementById(
    "main_container"
  ).innerHTML = await component.render();
  await component.after_render();
};

export const showLoading = () => {
  document.getElementById("loading-overlay").classList.add("active");
};

export const hideLoading = () => {
  document.getElementById("loading-overlay").classList.remove("active");
};

export const showMessage = (message, callback) => {
  document.getElementById('message-overlay').innerHTML = `
  <div>
    <div id='message-overlay-content'>${message}</div>
    <button id = 'message-overlay-close-button'>Окей</button>
  </div>
  `;
  document.getElementById('message-overlay').classList.add('active');
  document.getElementById('message-overlay-close-button').addEventListener('click', () => {
    document.getElementById('message-overlay').classList.remove('active');
    if(callback) {
      callback();
    }
  });
}

export const redirectUser = () => {
  if(getCartItems().length!==0) {
    document.location.hash = '/shipping';
  } else {
    document.location.hash = '/';
  }
}