import Popup from './Popup.js'

export default class PopupWithForm extends Popup {

  constructor({popupSelector, closeButton, submitForm}){
    super(popupSelector, closeButton);
    this._submitForm = submitForm;
    this._formSelector = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues() {

    this._inputList = this._popupSelector.querySelectorAll('.popup__form-text');
    
    const formValues = {};

    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });

    return formValues;
    
  }

  _submit = (evt) =>{
    evt.preventDefault();
    this._submitForm(this._getInputValues());
  }

  setEventListeners = () => {
    super.setEventListeners()
    this._formSelector.addEventListener('submit', this._submit)

  }

  close() {
    super.close();
    this._formSelector.reset()
  }
}


