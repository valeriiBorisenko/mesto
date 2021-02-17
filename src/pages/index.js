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
  buttonDeleteCard,
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
const cardList = new Section(cardElementObj, elementContainer);

const api = new Api ({
  url: "https://mesto.nomoreparties.co/v1/cohort-20/",
  headers: {
    "content-type": "application/json",
    "authorization": "a4e2a7e9-e2ca-4fbc-8dff-1e2c4b21f19a"
  }
})

Promise.all([api.getUserData(), api.getAllCards()])
.then(([user, cards])=>{
  userInfo.setUserInfo(user.name, user.about)
  userInfo.setUserAvatar(user.avatar)
  cardList.renderItems(cards)})
.catch((err) => {console.log(err);
})

function cardElementObj(item){
  const card = new Card(item, '#element-template', api, handleCardClick, handleOpenPopupWithSubmit)
  const cardElement = card.generateCard();
  cardList.setItem(cardElement);
}

function handleCardClick(evt) {
  openPopupImage.open(evt.src, evt.alt);
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
    .catch((err) => {console.log(err)});
    popupWithFormProfile.close();
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
    .catch((err) => {console.log(err)});
      popupWithFormAvatar.close();
  }
})

const popupWithFormElement = new PopupWithForm({
  popupSelector: popupPlaceElement,
  submitForm: (data) =>{
    api
    .addNewCard(data)
    .then((res)=> cardElementObj({
      name: res.name, 
      link: res.link}))
    .catch((err) => {console.log(err)});
     popupWithFormElement.close()
  }
})

function openPopupElement(){
  popupWithFormElement.open();
  cardValidAndClear.clearErrorMessage()
}

const popupWithSubmit = new PopupWithSubmit({
  popupSelector: popupPlaceDeleteCard,
  handleDeleteCard:()=>{
    api
    .removeCard(_id)
    .then((res)=>{res.target.closest('.element').remove();})
    .catch((err) => {console.log(err)})
  }
})

function handleOpenPopupWithSubmit(){
  popupWithSubmit.open()
};

popupWithFormProfile.setEventListeners();
popupWithFormAvatar.setEventListeners();
popupWithSubmit.setEventListeners();
popupWithFormElement.setEventListeners();
openPopupImage.setEventListeners()

avatarValidAndClear.enableValidation();
profileValidAndClear.enableValidation();
cardValidAndClear.enableValidation();

editButtonAboutProfile.addEventListener('click', openPopupProfile);
editButtonAvatar.addEventListener('click', openPopupAvatar)
addElementButton.addEventListener('click', openPopupElement);