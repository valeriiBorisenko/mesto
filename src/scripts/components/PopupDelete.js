import Popup from './Popup.js'

export default class PopupDelete extends Popup {

  constructor({popupSelector, submitForm}){
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popupSelector.querySelector('.popup__form');
  }

  _submit = (evt) =>{
    evt.preventDefault();
    this._submitForm();
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