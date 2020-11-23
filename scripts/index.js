const profileButtonEdit = document.querySelector('.profile__edit-button');
const popupButtonClose = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup')


profileButtonEdit.addEventListener('click', togglePopupVisibility);
popupButtonClose.addEventListener('click', togglePopupVisibility);

function togglePopupVisibility(){
  popup.classList.toggle('popup_visible');
}
