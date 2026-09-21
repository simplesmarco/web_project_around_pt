import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

function renderLoading(isLoading, button, buttonText = "Salvar") {
  if (isLoading) {
    button.textContent = "Salvando...";
  } else {
    button.textContent = buttonText;
  }
}

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "55238a21-4b4e-4181-b6ab-581beee92399",
    "Content-Type": "application/json",
  },
});

const editButton = document.querySelector(".profile__edit-button");
const avatarEditButton = document.querySelector(".profile__avatar-edit-button");
const addButton = document.querySelector(".profile__add-button");

const profileForm = document.querySelector("#edit-profile-form");
const avatarForm = document.querySelector("#avatar-form");
const newCardForm = document.querySelector("#new-card-form");

const nameInput = profileForm.querySelector(".popup__input_type_name");
const descriptionInput = profileForm.querySelector(
  ".popup__input_type_description",
);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const imagePopup = new PopupWithImage("#image-popup");

let currentUserId;
let cardToDelete = null;

const deleteConfirmationPopup = new PopupWithConfirmation(
  "#delete-popup",
  () => {
    if (!cardToDelete) {
      return;
    }

    api
      .deleteCard(cardToDelete.getId())
      .then(() => {
        cardToDelete.deleteCard();
        deleteConfirmationPopup.close();
        cardToDelete = null;
      })
      .catch((err) => {
        console.error(err);
      });
  },
);

imagePopup.setEventListeners();
deleteConfirmationPopup.setEventListeners();

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",

    (selectedCardData) => {
      imagePopup.open(selectedCardData);
    },

    (selectedCard) => {
      cardToDelete = selectedCard;
      deleteConfirmationPopup.open();
    },

    (selectedCard) => {
      const likeRequest = selectedCard.isLiked()
        ? api.removeLike(selectedCard.getId())
        : api.addLike(selectedCard.getId());

      likeRequest
        .then((updatedCard) => {
          selectedCard.setLikeStatus(updatedCard.isLiked);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    currentUserId,
  );

  return card.generateCard();
}

const cardSection = new Section(
  {
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
  const submitButton = profileForm.querySelector(".popup__button");
  renderLoading(true, submitButton);

  api
    .updateUserInfo({
      name: inputValues.name,
      about: inputValues.description,
    })
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar,
      });

      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
});

const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  const submitButton = newCardForm.querySelector(".popup__button");
  renderLoading(true, submitButton);

  api
    .addCard({
      name: inputValues.cardName,
      link: inputValues.link,
    })
    .then((cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
      newCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, "Criar");
    });
});

const avatarPopup = new PopupWithForm("#avatar-popup", (inputValues) => {
  const submitButton = avatarForm.querySelector(".popup__button");
  renderLoading(true, submitButton);

  api
    .updateAvatar(inputValues.avatar)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar,
      });

      avatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
});

const profileValidator = new FormValidator(validationConfig, profileForm);
const newCardValidator = new FormValidator(validationConfig, newCardForm);
const avatarValidator = new FormValidator(validationConfig, avatarForm);

editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();
avatarPopup.setEventListeners();

profileValidator.setEventListeners();
newCardValidator.setEventListeners();
avatarValidator.setEventListeners();

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

avatarEditButton.addEventListener("click", () => {
  avatarForm.reset();
  avatarValidator.resetValidation();
  avatarPopup.open();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    cards.forEach((cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    });
  })
  .catch((err) => {
    console.error(err);
  });
