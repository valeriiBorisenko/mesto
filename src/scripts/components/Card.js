export default class Card{

  constructor (data, cardSelector, myId, api, {handleCardClick, handleOpenPopupWithSubmit}){
    
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner;

    this._cardSelector = cardSelector;
    this._myId = myId
    this._api = api;

    this._handleOpenImage = handleCardClick;
    this._handleOpenPopupWithSubmit = handleOpenPopupWithSubmit;
   
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector('.element__button-delete')
    this._likeButton = this._element.querySelector('.element__button-like')
    this._likeCounter = this._element.querySelector('#like-counter')
  }
  
  _getTemplate() {
    const elementTemplate = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return elementTemplate;
  }

  generateCard () {
    const cardImage = this._element.querySelector('.element__image')
    const cardImageTitle = this._element.querySelector('.element__title')


    this._checkDeleteButton()
    this._checkLike()
    this._setEventListeners();

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardImageTitle.textContent = this._name;
    this._likeCounter.textContent = this._likes.length
    
    return this._element;
  }

  _checkLike(){
    if (this._likes.map(item=>item._id).includes(this._myId)){
      this._likeButton.classList.add('element__button-like_active')
    }
    else{
      this._likeButton.classList.remove('element__button-like_active')
    }
  }

  _checkDeleteButton(){
    if (this._ownerId._id === this._myId){
      this._deleteButton.classList.add('element__button-delete_active')
    }
    else{
      this._deleteButton.classList.remove('element__button-delete_active')
    }
  }

  _handleClickLike = () =>{
    if (this._likeButton.classList.contains('element__button-like_active')){
      this._api
      .removeLike(this._id)
      .then((res)=> this._likeCounter.textContent = res.likes.length)
      .then((res)=> res.likes = this._likes)
      .catch((err) => {console.log(err)})
      .finally(()=> this._likeButton.classList.remove('element__button-like_active'))
    }
    else{
      this._api
      .addLike(this._id)
      .then((res)=> this._likeCounter.textContent = res.likes.length)
      .then((res)=> res.likes = this._likes)
      .catch((err) => {console.log(err)})
      .finally(()=> this._likeButton.classList.add('element__button-like_active'))
    }
  }

  _setEventListeners = () => {

    this._element.querySelector('.element__image').addEventListener('click', (evt) => { 
      this._handleOpenImage(evt.target);
    }) 

    this._deleteButton.addEventListener('click', (evt)=>{
      evt.stopPropagation(evt);
      this._handleOpenPopupWithSubmit()
      })

    this._element.querySelector('.element__button-like').addEventListener('click', (evt)=>{
      evt.stopPropagation();
      this._handleClickLike()
    })
  }
}