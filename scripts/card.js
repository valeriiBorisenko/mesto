import {openPopup, popupPlaceImage, popupImage, popupTitle} from './index.js'

export default class Card {

  constructor (data, cardSelector){
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const elementTemplate = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return elementTemplate;
  }

  generateCard(){
    this._element = this._getTemplate();
    this._setEventListeners();


    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _handleOpenImage(){
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupTitle.textContent = this._name;
    openPopup(popupPlaceImage);
  }
  
  _deleteElement (evt){
    evt.target.closest('.element').remove();
  };

  _likeElement (evt) {
    evt.target.classList.toggle('element__button-like_active');
  };

  _setEventListeners() {

    this._element.addEventListener('click', () => {
      this._handleOpenImage();
    })
    this._element.querySelector('.element__button-delete').addEventListener('click', (evt)=>{
      evt.stopPropagation();
      this._deleteElement(evt)
    })
        this._element.querySelector('.element__button-like').addEventListener('click', (evt)=>{
      evt.stopPropagation();
      this._likeElement(evt)
    });
  }

}