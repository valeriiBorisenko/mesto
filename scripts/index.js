const profileButtonEdit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup')
const popupVisible = document.querySelector('.popup_visible');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupFormTitle = document.querySelector('.popup__form-text_type_title');
let popupFormSubtitle = document.querySelector('.popup__form-text_type_subtitle');

function clickPopupVisibility(){
  popup.classList.add('popup_visible');
  popupFormTitle.value = profileTitle.textContent;
  popupFormSubtitle.value = profileSubtitle.textContent;
}

profileButtonEdit.addEventListener('click', clickPopupVisibility);

const popupButtonClose = document.querySelector('.popup__close-button');
const popupWindow = document.querySelector('.popup__window')

function clickPopupHide(){
  popup.classList.remove('popup_visible',);
  popupWindow.reset();
}

popupButtonClose.addEventListener('click', clickPopupHide);

function popupWindowSubmit(event){
  event.preventDefault();
  profileTitle.textContent = popupFormTitle.value;
  profileSubtitle.textContent = popupFormSubtitle.value;
  clickPopupHide();
}

popupWindow.addEventListener('submit', popupWindowSubmit);