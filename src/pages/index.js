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
  profileAvatar,
  popupPlaceDeleteCard,
  buttonDeleteCard,
} from '../scripts/utils/constants.js'
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js'

const profileValidAndClear = new FormValidator(validationConfig, popupFormProfile);
profileValidAndClear.enableValidation();
const cardValidAndClear = new FormValidator(validationConfig, popupFormElement);
cardValidAndClear.enableValidation();
const avatarValidAndClear = new FormValidator(validationConfig, popupFormPlaceAvatar);
avatarValidAndClear.enableValidation();

const openPopupImage = new PopupWithImage(popupPlaceImage)
openPopupImage.setEventListeners()

const userInfo = new UserInfo (profileName, profileAbout, profileAvatar)

const cardList = new Section(cardElementObj, elementContainer);

/*Function*/

const api = new Api ({
  url: "https://mesto.nomoreparties.co/v1/cohort-20/",
  headers: {
    "content-type": "application/json",
    "authorization": "a4e2a7e9-e2ca-4fbc-8dff-1e2c4b21f19a"
  }
})

api
.getAllCards()
.then((res) =>{cardList.renderItems(res)})
.catch((err) => {console.log(err);
})

function handleCardClick(evt) {
  openPopupImage.open(evt.src, evt.alt);
}

function cardElementObj(item){
  const card = new Card(item, '#element-template', handleCardClick, api)
  const cardElement = card.generateCard();
  cardList.setItem(cardElement);
}

function openPopupProfile(){
  api
  .getUserData()
  .then((res) =>{
    userInfo.getUserInfo(res)
  })
  .catch((err) => {console.log(err)});

  popupWithFormProfile.open();
  profileValidAndClear.clearErrorMessage()
}

const popupWithFormProfile = new PopupWithForm({
    popupSelector: popupPlaceProfile,
    submitForm: (data) =>{
      userInfo.setUserInfo(data, data)
      popupWithFormProfile.close();
  }
})

function openPopupElement(){
  popupWithFormElement.open();
    cardValidAndClear.clearErrorMessage()
}


const popupWithFormElement = new PopupWithForm({
  popupSelector: popupPlaceElement,
  submitForm: (data) =>{
    api.addNewCard
    ({
      name: popupInputElementTitle.value,
      link: popupInputElementImage.value,
    })
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


popupWithFormProfile.setEventListeners();
popupWithFormElement.setEventListeners();
popupWithFormAvatar.setEventListeners();


editButtonAboutProfile.addEventListener('click', openPopupProfile);
editButtonAvatar.addEventListener('click', openPopupAvatar)
addElementButton.addEventListener('click', openPopupElement);