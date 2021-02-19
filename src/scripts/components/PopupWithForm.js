import Popup from './Popup.js'

export default class PopupWithForm extends Popup {

  constructor({popupSelector, submitForm}){
    super(popupSelector);
    this._submitForm = submitForm;
    this._saveButton = this._popupSelector.querySelector('.popup__save-button')
    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputList = this._popupSelector.querySelectorAll('.popup__form-text');
    
    this._saveButtonBeforeClick = this._saveButton.textContent
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
    this._clickSaveChange()
  }

  _clickSaveChange(){
    this._saveButton.textContent = 'Сохранение...'
  }

  setEventListeners = () => {
    super.setEventListeners()
    this._form.addEventListener('submit', this._submit)
  }

  close() {
    super.close();
    this._saveButton.textContent = this._saveButtonBeforeClick
    this._form.reset()
  }
}

