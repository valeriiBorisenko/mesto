export default class FormValidator{
  
  constructor(config, formElement){
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = formElement;
    
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList = this._form.querySelectorAll(this._inputSelector);
  }

  enableValidation = () =>{
    this._setEventListener(this._form);

    this._form.addEventListener('submit', (evt) =>{
      evt.preventDefault();
    });

    this._setButtonState(this._submitButton, this._form.checkValidity())
 }

  clearErrorMessage () {
    this._inputList.forEach((input) => { 
      this._hideError(input)
      this._setButtonState(this._submitButton, this._form.checkValidity())
    }); 
  }

  _showError (input) {
    const errorText = this._form.querySelector(`.error_${input.id}-error`);
    errorText.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
    errorText.classList.add(this._errorClass)
  }

  _hideError (input) {
    const errorText = this._form.querySelector(`.error_${input.id}-error`);
    errorText.textContent = '';
    input.classList.remove(this._inputErrorClass);
    errorText.classList.remove(this._errorClass)
  }

  _checkInputValidity (input) {
    if(!input.validity.valid){
      this._showError(input);
    }
    else{
      this._hideError(input);
    }
}

  _setButtonState(button, isActive){
    if(isActive){
      button.classList.remove(this._inactiveButtonClass)
      button.disabled = false;
    }
    else {
      button.classList.add(this._inactiveButtonClass)
      button.disabled = true;
    }
  }

  _setEventListener = () =>{
    this._inputList.forEach( (input) => { 
      input.addEventListener('input', () =>{ 
        this._checkInputValidity(input)
        this._setButtonState(this._submitButton, this._form.checkValidity())
      });
    });
  }

  _hasInvalidInput =() => {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }
}