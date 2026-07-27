function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export function openModal(modal) {
  modal.classList.add("popup_is-opened");

  document.addEventListener("keydown", handleEscapeKey);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", handleEscapeKey);
}

export function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}
