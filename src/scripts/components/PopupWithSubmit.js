import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {

  constructor({popupSelector, handleDeleteCard}){
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._form = this._popupSelector.querySelector('.popup__window_place_delete-card');
  }

  setEventListeners = () => {
    super.setEventListeners()
    this._form.addEventListener('submit', this._handleDeleteCard)

  }

}