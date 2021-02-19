import Popup from './Popup.js';

export default class popupWithImage extends Popup{
  constructor(popupSelector, closeButton){
    super(popupSelector, closeButton);
    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._popupImageTitle = this._popupSelector.querySelector('.popup__title_place_image');
  }

  open(link, name){
    this._popupImage.src = link;
    this._popupImageTitle.textContent = name;
    this._popupImage.alt = name;
    super.open(); 
  }

  delete = (evt) =>{
    evt.preventDefault()
    this._element.parent.remove()
  }
}