export default class Popup{
  constructor(popupSelector, closeButton){
    this._popupSelector = popupSelector;
    this._closeButton = closeButton;
  }
  
  open(){
    this._popupSelector.classList.add('popup_visible');
    this.setEventListeners()

    document.addEventListener('keyup', this._handleEscClose);
    document.addEventListener('click', this._clickOutsidePopup);
  }

  close(){
    this._popupSelector.classList.remove('popup_visible');
    document.removeEventListener('keyup', this._handleEscClose);
    document.removeEventListener('click', this._clickOutsidePopup);
  }

  _handleEscClose = (evt) =>{
    if(evt.key === "Escape"){
      this.close();
    }
  }

  _clickOutsidePopup = (evt) =>{
    if(evt.target.classList.contains('popup_visible')){
      this.close(evt.target);
    }
  }
  
  setEventListeners () {
    this._closeButton.addEventListener('click', () =>{
      this.close();
    });
  }
}
