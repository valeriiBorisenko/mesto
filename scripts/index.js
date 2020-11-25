const profileButtonEdit = document.querySelector('.profile__edit-button');
const popupButtonClose = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup')
const popupVisible = document.querySelector('.popup_visible');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
const popupWindow = document.querySelector('.popup__window')
let popupFormTitle = document.querySelector('.popup__form-title');
let popupFormSubtitle = document.querySelector('.popup__form-subtitle');
const popupSaveButton = document.querySelector('.popup__save-button')

profileButtonEdit.addEventListener('click', togglePopupVisibility);
popupButtonClose.addEventListener('click', togglePopupVisibility);

function togglePopupVisibility(){
  popup.classList.toggle('popup_visible');
}

popupSaveButton.addEventListener('click', removePopupWindowSubmit);

  function removePopupWindowSubmit(){
    popup.classList.remove('popup_visible');
}

popupFormTitle.value = profileTitle.textContent;
popupFormSubtitle.value = profileSubtitle.textContent;

popupWindow.addEventListener('submit', popupWindowSubmit);

function popupWindowSubmit(event){
  event.preventDefault();
  profileTitle.textContent = popupFormTitle.value;
  profileSubtitle.textContent = popupFormSubtitle.value;
}

debugger
const elementButtons = [...document.querySelectorAll('.element__button')];

elementButtons.forEach((elementButton) =>{
  elementButton.addEventListener('click', function (){
    elementButton.classList.toggle('element__button_active')
  })
});