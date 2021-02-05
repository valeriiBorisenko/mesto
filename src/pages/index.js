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
  popupPlaceElement,
  closeElementButton,
  popupInputElementTitle,
  popupInputElementImage,
  closeProfileButton,
  editProfileButton,
  addElementButton,
} from '../scripts/utils/constants.js'
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';

const formValidAndClear = new FormValidator(validationConfig);
const userInfo = new UserInfo (profileName, profileAbout)

/*Function*/

function handleCardClick(evt) {
  const openPopupImage = new PopupWithImage(popupPlaceImage, closeImageButton)
  openPopupImage.open(evt.src, evt.alt); 
} 

function cardElementObj(item){
  const card = new Card(item, '#element-template', handleCardClick)
  const cardElement = card.generateCard();
  cardList.setItem(cardElement);
}

function openPopupProfile(){
  userInfo.getUserInfo(popupInputProfileName, popupInputProfileAbout)
  popupWithFormProfile.open();
  formValidAndClear.enableValidation(popupPlaceProfile);
  formValidAndClear.clearErrorMessage(popupPlaceProfile);
}

const popupWithFormProfile = new PopupWithForm({
    popupSelector: popupPlaceProfile,
    closeButton: closeProfileButton,
    submitForm: () =>{
      userInfo.setUserInfo(popupInputProfileName, popupInputProfileAbout)
      popupWithFormProfile.close();
  }
})

function openPopupElement(){
  popupWithFormElement.open();
  formValidAndClear.enableValidation(popupPlaceElement);
  formValidAndClear.clearErrorMessage(popupPlaceElement);
}

const cardList = new Section({
  items: initialElements,
  renderer: cardElementObj,
}, elementContainer);

const popupWithFormElement = new PopupWithForm({
  popupSelector: popupPlaceElement,
  closeButton: closeElementButton,
  submitForm: (data) =>{
    data = [{
      name: popupInputElementTitle.value,
      link: popupInputElementImage.value,
    }]
  const newCard = new Section({
      items: data,
      renderer: cardElementObj
    }, elementContainer)
  newCard.renderItems();
  popupWithFormElement.close()
  }
})

cardList.renderItems();
popupWithFormProfile.setEventListeners();
popupWithFormElement.setEventListeners();

editProfileButton.addEventListener('click', openPopupProfile);
addElementButton.addEventListener('click', openPopupElement);
