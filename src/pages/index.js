import '../pages/index.css'

import {
  initialElements, 
  validationConfig,
  elementContainer, 
  popupPlaceImage, 
  closeImageButton,
  popupPlaceProfile, 
  profileName,
  profileAbout,
  popupInputProfileName,
  popupInputProfileAbout,
  popupInputElementTitle,
  popupInputElementImage,
  popupPlaceElement,
  closeElementButton,
  closeProfileButton,
  editProfileButton,
  addElementButton,
  popupFormProfile,
  popupFormElement,
} from '../scripts/utils/constants.js'
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';

const profileValidAndClear = new FormValidator(validationConfig, popupFormProfile);
profileValidAndClear.enableValidation();
const cardValidAndClear = new FormValidator(validationConfig, popupFormElement);
cardValidAndClear.enableValidation();

const openPopupImage = new PopupWithImage(popupPlaceImage, closeImageButton)
openPopupImage.setEventListeners()

const userInfo = new UserInfo (profileName, profileAbout)

/*Function*/

function handleCardClick(evt) {
  openPopupImage.open(evt.src, evt.alt);
} 

function cardElementObj(item){
  const card = new Card(item, '#element-template', handleCardClick)
  const cardElement = card.generateCard();
  cardList.setItem(cardElement);
}

function openPopupProfile(){
  popupInputProfileName.value = userInfo.getUserInfo().hero
  popupInputProfileAbout.value = userInfo.getUserInfo().aboutHero
  popupWithFormProfile.open();
  profileValidAndClear.clearErrorMessage()
}

const popupWithFormProfile = new PopupWithForm({
    popupSelector: popupPlaceProfile,
    closeButton: closeProfileButton,
    submitForm: (data) =>{
      userInfo.setUserInfo(data['place_name'], data['place_about'])
      popupWithFormProfile.close();
  }
})

function openPopupElement(){
  popupWithFormElement.open();
    cardValidAndClear.clearErrorMessage()
}

const cardList = new Section({
  items: initialElements,
  renderer: cardElementObj,
}, elementContainer);

const popupWithFormElement = new PopupWithForm({
  popupSelector: popupPlaceElement,
  closeButton: closeElementButton,
  submitForm: (data) =>{
    data = {
      name: popupInputElementTitle.value,
      link: popupInputElementImage.value,
    }
    cardElementObj(data)
  popupWithFormElement.close()
  }
})

cardList.renderItems();
popupWithFormProfile.setEventListeners();
popupWithFormElement.setEventListeners();

editProfileButton.addEventListener('click', openPopupProfile);
addElementButton.addEventListener('click', openPopupElement);
