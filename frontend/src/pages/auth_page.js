import AuthErrorModal from "../component/auth_error_modal.js";
import { hydrateAuth } from "./hydration/auth.js";

const Prompt = (id=undefined) => {
  const prompt = document.createElement('div');
  prompt.className = "mb-3";

  if (typeof id != 'undefined') {
    prompt.id = id;
  }

  return prompt;
}

const InputLabel = (textContent) => {
  const inputLabel = document.createElement('label');
  inputLabel.className = "form-label";
  inputLabel.textContent = textContent;
  return inputLabel;
}

const FormInput = (id=undefined) => {
  const formInput = document.createElement('input');
  formInput.type = "text";
  formInput.className = "form-control";

  if (typeof id != 'undefined') {
    formInput.id = id;
  }

  return formInput;
}

const NamePrompt = () => {
  const namePrompt = Prompt('name-prompt');
  namePrompt.appendChild(InputLabel('Name'));
  namePrompt.appendChild(FormInput('name-input'));
  namePrompt.hidden = true;

  return namePrompt;
}

const EmailPrompt = () => {
  const emailPrompt = Prompt();
  emailPrompt.appendChild(InputLabel('Email address'));
  emailPrompt.appendChild(FormInput('email-input'));
  
  return emailPrompt;
}

const PasswordPrompt = () => {
  const passwordPrompt = Prompt();
  passwordPrompt.appendChild(InputLabel('Password'));
  passwordPrompt.appendChild(FormInput('password-input'));

  return passwordPrompt;
}

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

  const namePrompt = NamePrompt();
  const emailPrompt = EmailPrompt();
  const passwordPrompt = PasswordPrompt();

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
