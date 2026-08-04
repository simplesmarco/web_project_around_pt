import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const editButton = document.querySelector(".profile__edit-button");

const addButton = document.querySelector(".profile__add-button");

const profileForm = document.querySelector("#edit-profile-form");

const newCardForm = document.querySelector("#new-card-form");

const nameInput = profileForm.querySelector(".popup__input_type_name");

const descriptionInput = profileForm.querySelector(
  ".popup__input_type_description",
);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");

imagePopup.setEventListeners();

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", (selectedCardData) => {
    imagePopup.open(selectedCardData);
  });

  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,

    renderer: (cardData) => {
      const cardElement = createCard(cardData);

      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues.name,
    job: inputValues.description,
  });

  editProfilePopup.close();
});

const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  const cardElement = createCard({
    name: inputValues.cardName,
    link: inputValues.link,
  });

  cardSection.addItem(cardElement);
  newCardPopup.close();
});

const profileValidator = new FormValidator(validationConfig, profileForm);

const newCardValidator = new FormValidator(validationConfig, newCardForm);

editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();

profileValidator.setEventListeners();
newCardValidator.setEventListeners();

cardSection.renderItems();

editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  nameInput.value = currentUserInfo.name;
  descriptionInput.value = currentUserInfo.job;

  profileValidator.resetValidation();
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});
