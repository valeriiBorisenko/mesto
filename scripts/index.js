const popupVisible = document.querySelector('.popup_visible');
/*button*/
const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = document.querySelector('.popup__close-button_place_profile');

const addElementButton = document.querySelector('.profile__add-button');
const closeElementButton = document.querySelector('.popup__close-button_place_element');

const closeImageButton = document.querySelector('.popup__close-button_place_image');

/*profile*/ 
const popupPlaceProfile = document.querySelector('.popup_place_profile');
const popupWindowProfile = document.querySelector('.popup__window_place_profile');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const popupFormProfileName = document.querySelector('.popup__form-text_type_profile-name');
const popupFormProfileAbout = document.querySelector('.popup__form-text_type_profile-about');

/*element*/
const popupPlaceElement = document.querySelector('.popup_place_element');
const popupWindowElement = document.querySelector('.popup__window_place_element');
const popupFormCardsName = document.querySelector('.popup__form-text_type_cards-name');
const popupFormCardsImage = document.querySelector('.popup__form-text_type_cards-image');

/*image*/
const popupPlaceImage = document.querySelector('.popup_place_image');
const popupImageOpen = document.querySelector('.popup__image');
const popupTitleOpen = document.querySelector('.popup__title_place_image');

/*function profile*/
function clickPopupVisibilityProfile(){
  popupPlaceProfile.classList.add('popup_visible');
  popupFormProfileName.value = profileName.textContent;
  popupFormProfileAbout.value = profileAbout.textContent;
}
editProfileButton.addEventListener('click', clickPopupVisibilityProfile);

function clickPopupHideProfile(){
  popupPlaceProfile.classList.remove('popup_visible');
  popupWindowProfile.reset();
}

closeProfileButton.addEventListener('click', clickPopupHideProfile);

function submitPopupWindow(event){
  event.preventDefault();
  profileName.textContent = popupFormProfileName.value;
  profileAbout.textContent = popupFormProfileAbout.value;
  clickPopupHideProfile();
}
popupWindowProfile.addEventListener('submit', submitPopupWindow);

/*function element*/

function clickPopupVisibilityElement(){
  popupPlaceElement.classList.add('popup_visible');  
}
addElementButton.addEventListener('click', clickPopupVisibilityElement);

function clickPopupHideElement(){
  popupPlaceElement.classList.remove('popup_visible');
  popupWindowElement.reset();
}

closeElementButton.addEventListener('click', clickPopupHideElement)

const initialElement = [
  {
      name: 'Поездка на море с досками',
      link: './image/elements/van.jpeg'
  },
  {
      name: 'Доброе утро',
      link: './image/elements/morning.jpeg'
  },
  {
      name: 'Свежий кофе у костра',
      link: './image/elements/coffee.jpeg'
  },
  {
      name: 'Вид из машины',
      link: './image/elements/view_from_van.jpeg'
  },
  {
      name: 'Горное озеро',
      link: './image/elements/boat.jpeg'
  },
  {
      name: 'Подготовка к путешествию',
      link: './image/elements/road_trip.jpeg'
  }
];

const elementContainer = document.querySelector('.elements__container');
const templateElement = document.querySelector('#elementClone').content;

function renderElements(){
  const elementSection = initialElement.map(composeElement);
  elementContainer.append(...elementSection);
}

function composeElement({link, name}){
  const newContainerElement = templateElement.cloneNode(true);
  const imageElement = newContainerElement.querySelector('.element__image');
  const titleElement = newContainerElement.querySelector('.element__title');
  imageElement.src = link;
  imageElement.alt = name;
  titleElement.textContent = name;

  newContainerElement.querySelector('.element__buttonDelete').addEventListener('click', function (event){
    const targetElement = event.target.closest('.element');
    targetElement.remove();
  });
  newContainerElement.querySelector('.element__buttonLike').addEventListener('click', function (event){
    event.target.classList.toggle('element__buttonLike_active');
  });

  newContainerElement.querySelector('.element__image').addEventListener('click', clickPopupVisibilityImage({link, name}));

  return newContainerElement;
};

const popupFormElementName = document.querySelector('.popup__form-text_type_element-name');
const popupFormElementImage = document.querySelector('.popup__form-text_type_image');

function addNewElementUser(event){
 event.preventDefault();
 const nameElementUser = popupFormElementName.value;
 const imageElementUser = popupFormElementImage.value;
 const newContainerElement = composeElement({ link: imageElementUser, name: nameElementUser});
 elementContainer.prepend(newContainerElement);
 popupFormElementName.value = "";
 popupFormElementImage.value = "";
 clickPopupHideElement()
}
popupWindowElement.addEventListener('submit', addNewElementUser);

/* function image */

const clickPopupVisibilityImage = ({link, name})=>(event)=>{
  popupPlaceImage.classList.add('popup_visible');
    popupImageOpen.src = link;
    popupImageOpen.alt = name;
    popupTitleOpen.textContent = name;
}


function clickPopupHideImage(){
  popupPlaceImage.classList.remove('popup_visible');
  popupWindowElement.reset();
}
closeImageButton.addEventListener('click', clickPopupHideImage)

renderElements();