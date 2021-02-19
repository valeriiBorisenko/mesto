import './index.css'

import {
  validationConfig,
  elementContainer, 
  popupPlaceImage, 
  popupPlaceProfile, 
  profileName,
  profileAbout,
  popupInputProfileName,
  popupInputProfileAbout,
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
} from '../scripts/utils/constants.js'
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js'
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';

const profileValidAndClear = new FormValidator(validationConfig, popupFormProfile);
const cardValidAndClear = new FormValidator(validationConfig, popupFormElement);
const avatarValidAndClear = new FormValidator(validationConfig, popupFormPlaceAvatar);
const openPopupImage = new PopupWithImage(popupPlaceImage)
const userInfo = new UserInfo (profileName, profileAbout, profileAvatar)
const cardList = new Section(cardElementObj,  elementContainer);

let userData
let cardId

const api = new Api ({
  url: "https://mesto.nomoreparties.co/v1/cohort-20/",
  headers: {
    "content-type": "application/json",
    "authorization": "a4e2a7e9-e2ca-4fbc-8dff-1e2c4b21f19a"
  }
})

api
.getUserData()
.then((res)=> {
  userInfo.setUserInfo(res.name, res.about)
  userInfo.setUserAvatar(res.avatar)
  userData = res._id
})
 .catch((err) => {console.log(err)})

api.getAllCards()
  .then((res)=> cardList.renderItems(res))
  .catch((err) => {console.log(err);
})

function cardElementObj(item){
  const card = new Card(item,  '#element-template', userData, api, {
    handleCardClick(evt) {openPopupImage.open(evt.src, evt.alt)}, 
    handleOpenPopupWithSubmit() {popupWithDeleteElement.open(cardId = item._id, cardElement)},
  })
  const cardElement = card.generateCard();
  cardList.setItem(cardElement)
}

function openPopupProfile(){
  popupInputProfileName.value = userInfo.getUserInfo().name
  popupInputProfileAbout.value = userInfo.getUserInfo().about
  popupWithFormProfile.open();
  profileValidAndClear.clearErrorMessage()
}

const popupWithFormProfile = new PopupWithForm({
  popupSelector: popupPlaceProfile,
  submitForm: (data) =>{
    api
    .patchUserData(data)
    .then((res)=> userInfo.setUserInfo(res.name, res.about))
    .catch((err) => {console.log(err)})
    .finally(()=> popupWithFormProfile.close())
  }
})

function openPopupAvatar(){
  popupWithFormAvatar.open();
  avatarValidAndClear.clearErrorMessage()
}

const popupWithFormAvatar = new PopupWithForm({
  popupSelector: popupPlaceAvatar,
  submitForm: (res) =>{
    api
    .patchUserAvatar(res)
    .then((res)=> userInfo.setUserAvatar(res.avatar))
    .catch((err) => {console.log(err)})
    .finally(()=> popupWithFormAvatar.close())
  }
})

const popupWithFormElement = new PopupWithForm({
  popupSelector: popupPlaceElement,
  submitForm: (data) =>{
    api
    .addNewCard(data)
    .then((res)=> cardElementObj(res))
    .catch((err) => {console.log(err)})
    .finally(()=> popupWithFormElement.close())
  }
})

function openPopupElement(){
  popupWithFormElement.open();
  cardValidAndClear.clearErrorMessage()
}

const popupWithDeleteElement = new PopupWithSubmit({
  popupSelector: popupPlaceDeleteCard,
  submit: ()=>{
    api
    .removeCard(cardId)
    .then(()=> popupWithDeleteElement.deleteCard())
    .catch((err) => {console.log(err)})
    .finally(()=> popupWithDeleteElement.close())
} })

popupWithFormProfile.setEventListeners();
popupWithFormAvatar.setEventListeners();
popupWithFormElement.setEventListeners();
openPopupImage.setEventListeners()
popupWithDeleteElement.setEventListeners()

avatarValidAndClear.enableValidation();
profileValidAndClear.enableValidation();
cardValidAndClear.enableValidation();

editButtonAboutProfile.addEventListener('click', openPopupProfile);
editButtonAvatar.addEventListener('click', openPopupAvatar)
addElementButton.addEventListener('click', openPopupElement);
