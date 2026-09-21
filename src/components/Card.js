export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    userId,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._owner = data.owner;
    this._isLiked = data.isLiked;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
    }

    this._image.addEventListener("click", () => {
      this._handleCardClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  setLikeStatus(isLiked) {
    this._isLiked = isLiked;
    this._likeButton.classList.toggle(
      "card__like-button_is-active",
      this._isLiked,
    );
  }

  deleteCard() {
    this._handleDeleteCard();
  }

  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    if (this._owner !== this._userId) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this.setLikeStatus(this._isLiked);

    this._setEventListeners();

    return this._element;
  }
}
