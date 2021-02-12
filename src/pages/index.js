import '../pages/index.css'

import {
  initialElements, 
  validationConfig,
  elementContainer, 
  popupPlaceImage, 
  popupPlaceProfile, 
  profileName,
  profileAbout,
  popupInputProfileName,
  popupInputProfileAbout,
  popupInputElementTitle,
  popupInputElementImage,
  popupPlaceElement,
  editButtonAboutProfile,
  addElementButton,
  popupFormProfile,
  popupFormElement,
  popupFormPlaceAvatar,
  editButtonAvatar,
  popupPlaceAvatar,
  profileAvatar
} from '../scripts/utils/constants.js'
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Popup from '../scripts/components/Popup';

const profileValidAndClear = new FormValidator(validationConfig, popupFormProfile);
profileValidAndClear.enableValidation();
const cardValidAndClear = new FormValidator(validationConfig, popupFormElement);
cardValidAndClear.enableValidation();
const avatarValidAndClear = new FormValidator(validationConfig, popupFormPlaceAvatar);
avatarValidAndClear.enableValidation();

const openPopupImage = new PopupWithImage(popupPlaceImage)
openPopupImage.setEventListeners()

const userInfo = new UserInfo (profileName, profileAbout)


/*Function*/

function handleCardClick(evt) {
  openPopupImage.open(evt.src, evt.alt);
}

function deleteElement (evt){
  const openPopupDeleteCard = new PopupWithForm()
  if (evt.target.closest('.element').remove()){

  }
    
  };


function cardElementObj(item){
  const card = new Card(item, '#element-template', handleCardClick, deleteElement)
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
    submitForm: (data) =>{
      userInfo.setUserInfo(data['place_name'], data['place_about'], '')
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
  submitForm: (data) =>{
    data = {
      name: popupInputElementTitle.value,
      link: popupInputElementImage.value,
    }
    cardElementObj(data)
  popupWithFormElement.close()
  }
})

function openPopupAvatar(){
  popupWithFormAvatar.open();
  avatarValidAndClear.clearErrorMessage()
}

  const popupWithFormAvatar = new PopupWithForm({
    popupSelector: popupPlaceAvatar,
    submitForm: (data) =>{
      profileAvatar.src = data['place_avatar']
      popupWithFormAvatar.close();
  }
})

cardList.renderItems();
popupWithFormProfile.setEventListeners();
popupWithFormElement.setEventListeners();
popupWithFormAvatar.setEventListeners();


editButtonAboutProfile.addEventListener('click', openPopupProfile);
addElementButton.addEventListener('click', openPopupElement);
editButtonAvatar.addEventListener('click', openPopupAvatar)
