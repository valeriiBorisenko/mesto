import Popup from './Popup.js'

export default class PopupWithForm extends Popup {

  constructor({popupSelector, submitForm}){
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputList = this._popupSelector.querySelectorAll('.popup__form-text');
  }

  _getInputValues() {
 
    const data = {};

    this._inputList.forEach(input => {
      data[input.name] = input.value;
    });

    return data;
    
  }

  _submit = (evt) =>{
    evt.preventDefault();
    this._submitForm(this._getInputValues());
  }

  setEventListeners = () => {
    super.setEventListeners()
    this._form.addEventListener('submit', this._submit)

  }

  close() {
    super.close();
    this._form.reset()
  }
}


