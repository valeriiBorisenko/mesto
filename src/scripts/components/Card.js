export default class Card{

  constructor (data, cardSelector, handleCardClick, api){
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner
    this._cardSelector = cardSelector;
    this._handleOpenImage = handleCardClick;
    this._api = api
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__button-like')
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

    if (this._element === this._ownerId){
      this._element.classList.add('.element__button-delete_active')
    }else{
      this._element.classList.remove('.element__button-delete_active')
    }

    this._setEventListeners();

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardImageTitle.textContent = this._name;
    
    return this._element;
  }

  _likeElement (evt) {
    evt.target.classList.toggle('element__button-like_active');
    
    const likeCounter = this._element.querySelector('#like-counter')
    if(this._likeButton.classList.contains('element__button-like_active')){

      likeCounter.innerHTML = (likeCounter.innerHTML | 0) +1
    }
    else{
      likeCounter.innerHTML -= 1
    }
  }

  _deleteElement = () =>{
    this._api
    .removeCard(this._ownerId)
    .then((evt)=>{evt.target.closest('.element').remove();})
    .catch((err) => {console.log(err)})
  };

  _setEventListeners = () => {

    this._element.querySelector('.element__image').addEventListener('click', (evt) => { 
      this._handleOpenImage(evt.target);
    }) 

    this._element.querySelector('.element__button-delete').addEventListener('click', (evt)=>{
      evt.stopPropagation(evt);
      })

    this._likeButton.addEventListener('click', (evt)=>{
      evt.stopPropagation();
      this._likeElement(evt)
    });
  }

}