import { SERVER_ROUTE } from "./config.js";

const getElem = (elemId) => {
  return document.querySelector(`#${elemId}`);
}

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
  getElem("error-msg").hidden = true;
});

getElem('auth-form').addEventListener('submit', (e) => {
  e.preventDefault(); // To prevent page reload

  let apiRoute = "/auth/login";
  let payload = {
    "email": getElem('email-input').value,
    "passowrd": getElem('password-input').value,
  };

  if (!isLoginMode()) {
    apiRoute = "/auth/register";
    payload = {
      name: getElem('name-input').textContent,
      ...payload,
    };
  } 

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  }

  fetch(SERVER_ROUTE + apiRoute, options)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        const errorDisplay = getElem("error-msg");
        errorDisplay.textContent = data.error;
        errorDisplay.hidden = false;
      } else {
        // redirect
        window.location.href = "../main_page.html";
      }
    });
});
