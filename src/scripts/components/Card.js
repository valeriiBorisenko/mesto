export default class Card{

  constructor (data, cardSelector, handleCardClick){
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleOpenImage = handleCardClick;
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

    const cardImage = this._element.querySelector('.element__image')
    const cardImageTitle = this._element.querySelector('.element__title')

    this._setEventListeners();

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardImageTitle.textContent = this._name;
    
    return this._element;
  }

  _deleteElement (evt){
    evt.target.closest('.element').remove();
  };

  _likeElement (evt) {
    evt.target.classList.toggle('element__button-like_active');
  };

  _setEventListeners = () => {

    this._element.querySelector('.element__image').addEventListener('click', (evt) => { 
      this._handleOpenImage(evt.target); 
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