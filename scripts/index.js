import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

import { openModal, closeModal, handleOverlayClick } from "./utils.js";

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

const editPopup = document.querySelector("#edit-popup");

const closeButton = editPopup.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector(".popup__input_type_name");

const descriptionInput = document.querySelector(
  ".popup__input_type_description",
);

const profileForm = document.querySelector("#edit-profile-form");

const addButton = document.querySelector(".profile__add-button");

const newCardPopup = document.querySelector("#new-card-popup");

const newCardCloseButton = newCardPopup.querySelector(".popup__close");

const newCardForm = document.querySelector("#new-card-form");

const cardNameInput = document.querySelector(".popup__input_type_card-name");

const cardLinkInput = document.querySelector(".popup__input_type_url");

const imagePopup = document.querySelector("#image-popup");

const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

const popupImage = imagePopup.querySelector(".popup__image");

const popupCaption = imagePopup.querySelector(".popup__caption");

const cardsList = document.querySelector(".cards__list");

const profileValidator = new FormValidator(validationConfig, profileForm);

const newCardValidator = new FormValidator(validationConfig, newCardForm);

profileValidator.setEventListeners();
newCardValidator.setEventListeners();

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();

  profileValidator.resetValidation();

  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editPopup);
}

function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopup);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);

  return card.generateCard();
}

function renderCard(cardData, container) {
  const cardElement = createCard(cardData);

  container.prepend(cardElement);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  renderCard(cardData, cardsList);

  newCardForm.reset();
  newCardValidator.resetValidation();

  closeModal(newCardPopup);
}

initialCards.forEach(function (cardData) {
  renderCard(cardData, cardsList);
});

editButton.addEventListener("click", handleOpenEditModal);

closeButton.addEventListener("click", function () {
  closeModal(editPopup);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

addButton.addEventListener("click", function () {
  newCardValidator.resetValidation();

  openModal(newCardPopup);
});

newCardCloseButton.addEventListener("click", function () {
  closeModal(newCardPopup);
});

newCardForm.addEventListener("submit", handleCardFormSubmit);

imagePopupCloseButton.addEventListener("click", function () {
  closeModal(imagePopup);
});

editPopup.addEventListener("click", handleOverlayClick);

newCardPopup.addEventListener("click", handleOverlayClick);

imagePopup.addEventListener("click", handleOverlayClick);
