import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {

  constructor({popupSelector, submitForm}) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._deleteButton = this._popupSelector.querySelector('.popup__save-button')
    this._form = this._popupSelector.querySelector('.popup__window_place_delete-card');

    this._deleteButtonBeforeClick = this._deleteButton.textContent
    }
    

    _clickSaveChange(){
    this._deleteButton.textContent = 'Удаление...'
  }

    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', this._submit);
    }

    _submit(evt) {
      evt.preventDefault();
       this._submitForm(this._deleteCard());
    }

    _deleteCard(){
      this._element.remove()
    }

    close() {
      super.close();
      this._deleteButton.textContent = this._deleteButtonBeforeClick
  }
}