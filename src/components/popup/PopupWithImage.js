import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, url, caption) {
        super(popupSelector);
        this._url = url;
        this._caption = caption;
        this._image = this._element.querySelector(".popup__image");
    }

    open = ({ caption, url }) => {
        super.open();
        this._image.setAttribute("src", url);
        this._image.setAttribute("alt", caption);
        this._element.querySelector(".popup__text").textContent = caption;
    }
}