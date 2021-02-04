export default class FormValidator{
  
  constructor(config){
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  enableValidation = () =>{
    const forms = document.querySelectorAll(this._formSelector);
    forms.forEach((form) =>{
      this._setEventListener(form);
      form.addEventListener('submit', (evt) =>{
        evt.preventDefault();
      });
      const submitButton = form.querySelector(this._submitButtonSelector);
      this._setButtonState(submitButton, form.checkValidity())
    });
  }

  clearErrorMessage = (form) => {
    const inputList = form.querySelectorAll(this._inputSelector);

    inputList.forEach((input) => {
      this._hideError(form, input)
    });
  }

  _showError = (form, input) =>{
    const errorTextElement = form.querySelector(`.${input.id}-error`);
    errorTextElement.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
    errorTextElement.classList.add(this._errorClass)
  }

  _hideError = (form, input) =>{
    const errorTextElement = form.querySelector(`.${input.id}-error`);
    errorTextElement.textContent= '';
    input.classList.remove(this._inputErrorClass);
    errorTextElement.classList.remove(this._errorClass)
  }

  _checkInputValidity = (form, input) =>{
    if(input.validity.valid){
      this._hideError(form, input)
    }
    else{
      this._showError(form, input);
    }
}

  _setButtonState = (button, isActive) =>{
    if(isActive){
      button.classList.remove(this._inactiveButtonClass)
      button.disabled = false;
    }
    else {
      button.classList.add(this._inactiveButtonClass)
      button.disabled = true;
    }
  }

  _setEventListener = (form) =>{
    const inputList = form.querySelectorAll(this._inputSelector);
    const submitButton = form.querySelector(this._submitButtonSelector);

    inputList.forEach( (input) => {
      input.addEventListener('input', () =>{
        this._checkInputValidity(form, input)
        this._setButtonState(submitButton, form.checkValidity())
      });
    });
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    })
  }
}