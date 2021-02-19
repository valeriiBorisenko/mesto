import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {

  constructor({popupSelector, submit}){
    super(popupSelector);
    this._submit = submit
    this._deleteButton = this._popupSelector.querySelector('.popup__save-button')
    this._form = this._popupSelector.querySelector('.popup__window_place_delete-card');
    this._deleteButtonBeforeClick = this._deleteButton.textContent
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitDelete);
  }

  _submitDelete = (evt) =>{
    evt.preventDefault();
    this._clickSaveChange()
    this._submit(this._cardId)
  }

  _clickSaveChange(){
    this._deleteButton.textContent = 'Удаление...'
  }

  open(cardId, cardData){
    super.open(),
    this._cardId = cardId
    this._cardElement = cardData
  }

  deleteCard(){
    this._cardElement.remove()
  }

  close() {
    super.close();
    this._deleteButton.textContent = this._deleteButtonBeforeClick
  }
}
