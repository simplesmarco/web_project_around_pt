import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmit();
    });
  }
}
