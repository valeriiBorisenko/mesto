import {validationConfig} from './validate-config.js';

function showError(form, input, config){
  const errorTextElement = form.querySelector(`.${input.id}-error`);
  errorTextElement.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
  errorTextElement.classList.add(config.errorClass)
}

function hideError(form, input, config){
  const errorTextElement = form.querySelector(`.${input.id}-error`);
  errorTextElement.textContent= '';
  input.classList.remove(config.inputErrorClass);
  errorTextElement.classList.remove(config.errorClass)
}

function checkInputValidity(form, input, config){
 if(input.validity.valid){
    hideError(form, input, config)
  }
  else{
    showError(form, input, config);
  }
}

function setButtonState(button, isActive, config){
  if(isActive){
    button.classList.remove(config.inactiveButtonClass)
    button.disabled = false;
  }
  else {
    button.classList.add(config.inactiveButtonClass)
    button.disabled = true;
  }
}

function setEventListener(form, config){
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputList.forEach( (input) => {
    input.addEventListener('input', () =>{
      checkInputValidity(form, input, config)
      setButtonState(submitButton, form.checkValidity(), config)
      });
  });
}

function checkSubmitButton(config) {
  const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(form => {
    const submitButton = form.querySelector(config.submitButtonSelector);
    setButtonState(submitButton, form.checkValidity(), config);
});
}

function hasInvalidInput (inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

function enableValidation(config){
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) =>{
    setEventListener(form, config);
    form.addEventListener('submit', (evt) =>{
      evt.preventDefault();
  });
  const submitButton = form.querySelector(config.submitButtonSelector);
  setButtonState(submitButton, form.checkValidity(), config)
});
}

function clearErrorMessage(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);

  inputList.forEach((input) => {
  hideError(form, input, config)
  });
}

enableValidation(validationConfig);