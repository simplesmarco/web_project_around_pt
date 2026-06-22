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

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editPopup);
}

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(cardElement) {
  cardElement.remove();
}

function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopup);
}

function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  cardLikeButton.addEventListener("click", handleLikeButtonClick);

  cardDeleteButton.addEventListener("click", function () {
    handleDeleteCard(cardElement);
  });

  cardImage.addEventListener("click", function () {
    handleImageClick(name, link);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);

  container.prepend(cardElement);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  renderCard(cardNameInput.value, cardLinkInput.value, cardsList);

  newCardForm.reset();

  closeModal(newCardPopup);
}

initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardsList);
});

editButton.addEventListener("click", handleOpenEditModal);

closeButton.addEventListener("click", function () {
  closeModal(editPopup);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

addButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

newCardCloseButton.addEventListener("click", function () {
  closeModal(newCardPopup);
});

newCardForm.addEventListener("submit", handleCardFormSubmit);

imagePopupCloseButton.addEventListener("click", function () {
  closeModal(imagePopup);
});
