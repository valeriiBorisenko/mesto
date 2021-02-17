export default class Card{

  constructor (data, cardSelector, api, handleCardClick, handleOpenPopupWithSubmit, handleClickLike){
    
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner;

    this._cardSelector = cardSelector;
    this._api = api;
    this._handleOpenImage = handleCardClick;
    this._handleOpenPopupWithSubmit = handleOpenPopupWithSubmit;
    this._handleClickLike = handleClickLike;
   
    this._element = this._getTemplate();
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

    const cardImage = this._element.querySelector('.element__image')
    const cardImageTitle = this._element.querySelector('.element__title')
    const likeCounter = this._element.querySelector('#like-counter')

    this._setEventListeners();

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardImageTitle.textContent = this._name;
    likeCounter.textContent = this._likes.length
    
    return this._element;
  }

  /*_likeElement (evt) {
    evt.target.classList.toggle('element__button-like_active');
    
    if(this._likeButton.classList.contains('element__button-like_active')){

      likeCounter.innerHTML = (likeCounter.innerHTML | 0) +1
    }
    else{
      likeCounter.innerHTML -= 1
    }
  }*/

  _setEventListeners = () => {

    this._element.querySelector('.element__image').addEventListener('click', (evt) => { 
      this._handleOpenImage(evt.target);
    }) 

    this._element.querySelector('.element__button-delete').addEventListener('click', (evt)=>{
      evt.stopPropagation(evt);
      this._handleOpenPopupWithSubmit()
      })

    this._element.querySelector('.element__button-like').addEventListener('click', (evt)=>{
      evt.stopPropagation();
      this._handleClickLike()
    });
  }

}