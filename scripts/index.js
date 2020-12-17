/*popup*/
const popup = document.querySelector('.popup')
const popupForm = document.querySelector('.popup__form')

/*profile*/ 
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

const popupPlaceProfile = document.querySelector('.popup_place_profile');
const popupFormProfile = document.querySelector('.popup__form_place_profile');
const popupTypeProfileName = document.querySelector('.popup__form-text_type_profile-name');
const popupTypeProfileAbout = document.querySelector('.popup__form-text_type_profile-about');

const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = document.querySelector('.popup__close-button_place_profile');

/*element*/
const elementContainer = document.querySelector('.elements__container');
const elementTemplate = document.querySelector('#element-template').content;

const popupPlaceElement = document.querySelector('.popup_place_element');
const popupFormElement = document.querySelector('.popup__form_place_element');
const popupTypeElementTitle = document.querySelector('.popup__form-text_type_element-name');
const popupTypeElementImage = document.querySelector('.popup__form-text_type_image');

const addElementButton = document.querySelector('.profile__add-button');
const closeElementButton = document.querySelector('.popup__close-button_place_element');

/*image*/

const popupPlaceImage = document.querySelector('.popup_place_image');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__title_place_image');

const closeImageButton = document.querySelector('.popup__close-button_place_image');

/*popup*/

function clickPopupVisibility(popup){
popup.classList.add('popup_visible');
}

function clickPopupHide(popup){
  popup.classList.remove('popup_visible');
}

function resetForm(popupForm){
  popupForm.reset();
}

/*function profile*/

function submitProfile(event){
  event.preventDefault();
  profileName.textContent = popupTypeProfileName.value;
  profileAbout.textContent = popupTypeProfileAbout.value;
  clickPopupHide(popupPlaceProfile);
  resetForm(popupFormProfile)
}

function openPopupProfile(){
  popupTypeProfileName.value = profileName.textContent;
  popupTypeProfileAbout.value = profileAbout.textContent;
  clickPopupVisibility(popupPlaceProfile);
}

function closePopupProfile(){
  clickPopupHide(popupPlaceProfile);
  resetForm(popupFormProfile)
}

/*function element*/

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

  containerElement.querySelector('.element__button-delete').addEventListener('click', function (event){
    const targetElement = event.target.closest('.element');
    targetElement.remove();
  });
  containerElement.querySelector('.element__button-like').addEventListener('click', function (event){
    event.target.classList.toggle('element__button-like_active');
  });

  containerElement.querySelector('.element__image').addEventListener('click', openImage({link, name}));

  return containerElement;
};

function addNewElement(){
  const containerElement = composeElement({link: imageElementNew, name: titleElementNew});
  elementContainer.prepend(containerElement);
}

function submitNewElement(event){
  event.preventDefault();
  titleElementNew = popupTypeElementTitle.value;
  imageElementNew = popupTypeElementImage.value;
  addNewElement(popupFormElement);
  clickPopupHide(popupPlaceElement);
  resetForm(popupFormElement);
  }

function openPopupElement(){
  clickPopupVisibility(popupPlaceElement);
}

 function closePopupElement(){
   clickPopupHide(popupPlaceElement);
   resetForm(popupFormElement);
 } 

/* function image */

const openImage = ({link, name})=>()=>{
    popupImage.src = link;
    popupImage.alt = name;
    popupTitle.textContent = name;
    clickPopupVisibility(popupPlaceImage);
}

function closeImage(){
  clickPopupHide(popupPlaceImage);
}


/*Обработчики*/

popupFormProfile.addEventListener('submit', submitPopupProfile);
popupFormElement.addEventListener('submit', submitNewElement);

editProfileButton.addEventListener('click', openPopupProfile);
addElementButton.addEventListener('click', openPopupElement);

closeProfileButton.addEventListener('click', closePopupProfile);
closeElementButton.addEventListener('click', closePopupElement)
closeImageButton.addEventListener('click', closeImage)

renderElements();