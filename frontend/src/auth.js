import { LOGIN_ROUTE, REGISTER_ROUTE, SERVER_ROUTE } from "./config.js";
import Fetcher from "./fetcher.js";

const getElem = (elemId) => {
  return document.querySelector(`#${elemId}`);
}

// Introduces bugs if user changes the Html in development tool
// Therefore assuming users are monke 
const isLoginMode = () => {
  return getElem('auth-header').textContent.trim() === 'Login'; 
}

getElem('type-link').addEventListener("click", () => {
  const header = getElem('auth-header');
  const btn = getElem('submit-btn');
  const link = getElem('type-link');
  const namePrompt = getElem('name-prompt');

  if (isLoginMode()) {
    header.textContent = "Register";
    link.textContent = "Have an account? Login here!";
    namePrompt.hidden = false;
  } else {
    header.textContent = "Login";
    link.textContent = "No account? Register here!";
    namePrompt.hidden = true;
  }

  btn.textContent = header.textContent;
});

const openModal = () => {
  getElem('error-modal').showModal();
}

const closeModal = () => {
  getElem('error-modal').close();
}

document.querySelectorAll('.error-close').forEach(e => {
  e.addEventListener("click", () => {
    closeModal();
  });
});

window.onclick = e => {
  if (e.target == getElem('error-modal')) {
    closeModal();
  }
}

getElem('auth-form').addEventListener('submit', (e) => {
  e.preventDefault(); // To prevent page reload

  let apiRoute = LOGIN_ROUTE;
  let payload = {
    "email": getElem('email-input').value,
    "password": getElem('password-input').value,
  };

  if (!isLoginMode()) {
    apiRoute = REGISTER_ROUTE;
    payload = {
      name: getElem('name-input').value,
      ...payload,
    };
  } 

  const result = Fetcher.post(apiRoute).withJsonPayload(payload).fetchResult();

  result.then(data => {
      if (data.error) {
        getElem('error-msg').textContent = data.error;
        openModal();
      } else {
        // redirect
        localStorage.setItem('token', data.token);
        window.location.href = "../main_page.html";
      }
    })
    .catch(e => {
      getElem('error-msg').textContent = "Something went wrong from the server!";
      openModal();
    });
});
