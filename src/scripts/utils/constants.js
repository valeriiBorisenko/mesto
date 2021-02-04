/*profile*/ 
export const profileName = document.querySelector('.profile__title');
export const profileAbout = document.querySelector('.profile__subtitle');

export const popupPlaceProfile = document.querySelector('.popup_place_profile');
export const popupFormProfile = document.querySelector('.popup__form_place_profile');
export const popupInputProfileName = document.querySelector('.popup__form-text_type_profile-name');
export const popupInputProfileAbout = document.querySelector('.popup__form-text_type_profile-about');

export const editProfileButton = document.querySelector('.profile__edit-button');
export const closeProfileButton = document.querySelector('.popup__close-button_place_profile');

/*element*/
export const elementContainer = document.querySelector('.elements__container');

export const popupPlaceElement = document.querySelector('.popup_place_element');
export const popupFormElement = document.querySelector('.popup__form_place_element');
export const popupInputElementTitle = document.querySelector('.popup__form-text_type_element-name');
export const popupInputElementImage = document.querySelector('.popup__form-text_type_image');

export const addElementButton = document.querySelector('.profile__add-button');
export const closeElementButton = document.querySelector('.popup__close-button_place_element');

/*image*/

export const popupPlaceImage = document.querySelector('.popup_place_image');
export const closeImageButton = document.querySelector('.popup__close-button_place_image');

export const initialElements = [
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
  
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_state_invalid',
  inputErrorClass: 'popup__form-text_state_invalid',
  errorClass: 'error_active'
}; 