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
const elementTemplate = document.querySelector('#element-template').content;

const popupPlaceElement = document.querySelector('.popup_place_element');
const popupFormElement = document.querySelector('.popup__form_place_element');
const popupInputElementTitle = document.querySelector('.popup__form-text_type_element-name');
const popupInputElementImage = document.querySelector('.popup__form-text_type_image');

const addElementButton = document.querySelector('.profile__add-button');
const closeElementButton = document.querySelector('.popup__close-button_place_element');

/*image*/

const popupPlaceImage = document.querySelector('.popup_place_image');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__title_place_image');

const closeImageButton = document.querySelector('.popup__close-button_place_image');

/*function:*/

enableValidation(enableConfig);

/*popup*/
function clickPopupVisibility(popup){
  popup.classList.add('popup_visible');
  document.addEventListener('keyup', clickKeyEscape);
  document.addEventListener('click', clickOutsidePopup);
}

function clickPopupHide(popup){
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
  resetForm(popupFormProfile)
  clickPopupHide(popupPlaceProfile);
}

function openPopupProfile(){
  popupInputProfileName.value = profileName.textContent;
  popupInputProfileAbout.value = profileAbout.textContent;
  checkSubmitButton(enableConfig);
  clickPopupVisibility(popupPlaceProfile);
}

function closePopupProfile(){
  resetForm(popupFormProfile)
  clearErrorMessage(popupFormProfile, enableConfig);
  clickPopupHide(popupPlaceProfile);
}

/*element*/

function renderElements(){
  const elementSection = initialElement.map(composeElement);
  elementContainer.append(...elementSection);
}

function composeElement({link, name}){
  const containerElement = elementTemplate.cloneNode(true);
  const imageElement = containerElement.querySelector('.element__image');
  const titleElement = containerElement.querySelector('.element__title');
  imageElement.src = link;
  imageElement.alt = name;
  titleElement.textContent = name;

  containerElement.querySelector('.element__button-like').addEventListener('click', likeElement);
  containerElement.querySelector('.element__button-delete').addEventListener('click', deleteElement);
  containerElement.querySelector('.element__image').addEventListener('click', openImage({link, name}));

  return containerElement;
};

function deleteElement (evt){
  evt.target.closest('.element').remove();
};

function likeElement (evt) {
  evt.target.classList.toggle('element__button-like_active');
};

function addNewElement(data, container){
  container.prepend(composeElement(data));
}

function submitNewElement(evt){
  evt.preventDefault();
  titleElementNew = popupInputElementTitle.value;
  imageElementNew = popupInputElementImage.value;
  addNewElement({link: imageElementNew, name: titleElementNew}, elementContainer);
  clickPopupHide(popupPlaceElement);
  resetForm(popupFormElement);
  }

function openPopupElement(){
  checkSubmitButton(enableConfig);
  clickPopupVisibility(popupPlaceElement);
}

 function closePopupElement(){
    resetForm(popupFormElement);
    clearErrorMessage(popupFormElement, enableConfig);
    clickPopupHide(popupPlaceElement);
 } 

/*image */

const openImage = ({link, name})=>()=>{
    popupImage.src = link;
    popupImage.alt = name;
    popupTitle.textContent = name;
    clickPopupVisibility(popupPlaceImage);
}

function closeImage(){
  clickPopupHide(popupPlaceImage);
}

/*close popup another options*/

function clickKeyEscape(evt){
  const popupVisible = document.querySelector('.popup_visible')
    if(evt.key === "Escape"){
      clickPopupHide(popupVisible);
      resetForm(popupFormElement)
    }
}

function clickOutsidePopup(evt){
  const popupVisible = document.querySelector('.popup_visible');
  if(evt.target.contains(popupVisible)){
    clickPopupHide(popupVisible)
    resetForm(popupFormElement)
  }
}

/*handler*/

popupFormProfile.addEventListener('submit', submitProfile);
popupFormElement.addEventListener('submit', submitNewElement);

editProfileButton.addEventListener('click', openPopupProfile);
addElementButton.addEventListener('click', openPopupElement);

closeProfileButton.addEventListener('click', closePopupProfile);
closeElementButton.addEventListener('click', closePopupElement);
closeImageButton.addEventListener('click', closeImage);

renderElements();