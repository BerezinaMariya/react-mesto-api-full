import { useRef, useEffect } from "react";

function ImagePopup(props) {
  const popupRef = useRef();

  useEffect(() => {
    props.onCloseByOverlay(popupRef.current);
  }, []);

  useEffect(() => {
    if (props.card._id) {
      // Список действий внутри одного хука
      document.addEventListener("keydown", props.onCloseByEsc);
      // Возвращаем функцию, которая удаляет эффекты
      return () => {
        document.removeEventListener("keydown", props.onCloseByEsc);
      };
    }
  }, [props.card._id]);

  return (
    <div
      className={`popup popup_action_image-preview ${
        props.card._id ? "popup_opened" : ""
      }`}
      ref={popupRef}
    >
      <div className="popup__preview-container">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
          aria-label="Закрыть"
        ></button>
        <img
          className="popup__image-preview-url"
          src={props.card.link}
          alt={`Просмотр увеличенного изображения места ${props.card.name}`}
        />
        <h3 className="popup__image-preview-title">{props.card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
