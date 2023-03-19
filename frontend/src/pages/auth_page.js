// Welcome to not using React war crime

// Exhibit 1:
import AuthErrorModal from "../component/auth_error_modal.js";
import FormField from "../component/form_field.js";
import { hydrateAuth } from "./hydration/auth.js";

const AuthPage = () => {
  const authPage = document.createElement('div');

  const errorModal = AuthErrorModal();

  const mainPage = document.createElement('main');
  mainPage.className = "d-flex vh-100 justify-content-center align-items-center";

  const authForm = document.createElement('form');
  authForm.className = "auth-prompt p-4 pb-3 rounded-3 bg-white text-black";
  authForm.id = "auth-form";

  const authHeader = document.createElement('h1');
  authHeader.className = "text-center header-size mb-4";
  authHeader.id = "auth-header";
  authHeader.textContent = "Login";

  const namePrompt = FormField("Name", "text", "name-input");
  namePrompt.id = "name-prompt";
  namePrompt.hidden = true;

  const emailPrompt = FormField("Email address", "email", "email-input");
  const passwordPrompt = FormField("Password", "password", "password-input");

  const submitBtn = document.createElement('button');
  submitBtn.type = "submit";
  submitBtn.className = "btn btn-primary";
  submitBtn.id = "submit-btn";
  submitBtn.textContent = "Login";

  const switchBtn = document.createElement('button');
  switchBtn.type = "button";
  switchBtn.className = "pt-3 d-block text-primary text-decoration-underline bg-white border-0";
  switchBtn.id = "type-link";
  switchBtn.textContent = "No account? Register here!";

  authForm.append(
    authHeader,
    namePrompt,
    emailPrompt,
    passwordPrompt,
    submitBtn,
    switchBtn
  );

  mainPage.appendChild(authForm);

  authPage.append(errorModal, mainPage);
  hydrateAuth(authPage);
  return authPage;
}

export default AuthPage;
