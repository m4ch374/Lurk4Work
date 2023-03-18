import { LOGIN_ROUTE, REGISTER_ROUTE } from "../../config.js";
import Fetcher from "../../fetcher.js";
import { getElem } from "../../helpers.js";

// Introduces bugs if user changes the Html in development tool
// Therefore assuming users are monke 
const isLoginMode = (page) => {
  return getElem('auth-header', page).textContent.trim() === 'Login'; 
}

const openModal = (page) => {
  getElem('error-modal', page).showModal();
}

const hydrateAuth = (page) => {
  getElem('type-link', page).addEventListener("click", () => {
    const header = getElem('auth-header', page);
    const btn = getElem('submit-btn', page);
    const link = getElem('type-link', page);
    const namePrompt = getElem('name-prompt', page);
  
    if (isLoginMode(page)) {
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
  
  getElem('auth-form', page).addEventListener('submit', (e) => {
    e.preventDefault(); // To prevent page reload
  
    let apiRoute = LOGIN_ROUTE;
    let payload = {
      "email": getElem('email-input', page).value,
      "password": getElem('password-input', page).value,
    };
  
    if (!isLoginMode(page)) {
      apiRoute = REGISTER_ROUTE;
      payload = {
        name: getElem('name-input', page).value,
        ...payload,
      };
    } 
  
    const result = Fetcher.post(apiRoute).withJsonPayload(payload).fetchResult();
  
    result.then(data => {
        if (data.error) {
          getElem('error-msg', page).textContent = data.error;
          openModal(page);
        } else {
          // redirect
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          window.location.hash = "#feed";
        }
      })
      .catch(e => {
        getElem('error-msg', page).textContent = "Something went wrong from the server!";
        openModal(page);
      });
  });
}

export {hydrateAuth};
