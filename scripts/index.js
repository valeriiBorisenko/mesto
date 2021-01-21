//import {} from './validate.js';
import Card from './card.js';
import {initialElements} from './initial-elements.js';

/*profile*/ 
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

const popupPlaceProfile = document.querySelector('.popup_place_profile');
const popupFormProfile = document.querySelector('.popup__form_place_profile');
const popupInputProfileName = document.querySelector('.popup__form-text_type_profile-name');
const popupInputProfileAbout = document.querySelector('.popup__form-text_type_profile-about');

const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = document.querySelector('.popup__close-button_place_profile');

/*element*/
const elementContainer = document.querySelector('.elements__container');

const popupPlaceElement = document.querySelector('.popup_place_element');
const popupFormElement = document.querySelector('.popup__form_place_element');
const popupInputElementTitle = document.querySelector('.popup__form-text_type_element-name');
const popupInputElementImage = document.querySelector('.popup__form-text_type_image');

const addElementButton = document.querySelector('.profile__add-button');
const closeElementButton = document.querySelector('.popup__close-button_place_element');

/*image*/

export const popupPlaceImage = document.querySelector('.popup_place_image');
export const popupImage = document.querySelector('.popup__image');
export const popupTitle = document.querySelector('.popup__title_place_image');

const closeImageButton = document.querySelector('.popup__close-button_place_image');

/*function*/

initialElements.forEach((initialElement) => {
  const card = new Card(initialElement, '#element-template');
  const cardElement = card.generateCard();

  elementContainer.append(cardElement);
});


/*popup*/
export function openPopup(popup){
  popup.classList.add('popup_visible');
  document.addEventListener('keyup', clickKeyEscape);
  document.addEventListener('click', clickOutsidePopup);
}

function closePopup(popup){
  popup.classList.remove('popup_visible');
  document.removeEventListener('keyup', clickKeyEscape);
  document.removeEventListener('click', clickOutsidePopup);
}

function resetForm(popupForm){
  popupForm.reset();
}

/*profile*/

function submitProfile(evt){
  evt.preventDefault();
  profileName.textContent = popupInputProfileName.value;
  profileAbout.textContent = popupInputProfileAbout.value;
  // resetForm(popupFormProfile)
  closePopup(popupPlaceProfile);
}

function openPopupProfile(){
  popupInputProfileName.value = profileName.textContent;
  popupInputProfileAbout.value = profileAbout.textContent;
 // checkSubmitButton(validationConfig);
  openPopup(popupPlaceProfile);
}

function closePopupProfile(){
  //resetForm(popupFormProfile)
 // clearErrorMessage(popupFormProfile, validationConfig);
  closePopup(popupPlaceProfile);
}

/*element*/

function addNewElement(data, container){
  container.prepend(composeElement(data));
}

function submitNewElement(evt){
  evt.preventDefault();
  titleElementNew = popupInputElementTitle.value;
  imageElementNew = popupInputElementImage.value;
  addNewElement({link: imageElementNew, name: titleElementNew}, elementContainer);
  closePopup(popupPlaceElement);
 // resetForm(popupFormElement);
  }

function openPopupAddElement(){
 // checkSubmitButton(validationConfig);
  openPopup(popupPlaceElement);
}

 function closePopupAddElement(){
    resetForm(popupFormElement);
   // clearErrorMessage(popupFormElement, validationConfig);
    closePopup(popupPlaceElement);
 } 

/*image*/

function closeImage(){
  closePopup(popupPlaceImage);
}

/*close popup another options*/

function clickKeyEscape(evt){
  const popupVisible = document.querySelector('.popup_visible')
    if(evt.key === "Escape"){
      closePopup(popupVisible);
    }
}

function clickOutsidePopup(evt){
  if(evt.target.classList.contains('popup_visible')){
    closePopup(evt.target);
  }
}

/*handler*/

popupFormProfile.addEventListener('submit', submitProfile);
popupFormElement.addEventListener('submit', submitNewElement);

editProfileButton.addEventListener('click', openPopupProfile);
addElementButton.addEventListener('click', openPopupAddElement);

closeProfileButton.addEventListener('click', closePopupProfile);
closeElementButton.addEventListener('click', closePopupAddElement);
closeImageButton.addEventListener('click', closeImage);

