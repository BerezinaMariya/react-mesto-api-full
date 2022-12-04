import { useRef, useState, useEffect } from "react";
import sucsess from "../../images/infoTooltip-sucsess.svg";
import unsucsess from "../../images/infoTooltip-unsucsess.svg";

function InfoTooltip(props) {
  const popupRef = useRef();
  const [sucsessImage, setSucsessImage] = useState("");

  useEffect(() => {
    props.onCloseByOverlay(popupRef.current);
  }, []);

  useEffect(() => {
    if (props.isOpen) {
      // Список действий внутри одного хука
      document.addEventListener("keydown", props.onCloseByEsc);
      // Возвращаем функцию, которая удаляет эффекты
      return () => {
        document.removeEventListener("keydown", props.onCloseByEsc);
      };
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (props.isRegOrLogSucsess) {
      setSucsessImage(sucsess);
    } else {
      setSucsessImage(unsucsess);
    }
  }, [props.isRegOrLogSucsess]);

  return (
    <div
      className={`popup popup_action_info-tooltip ${
        props.isOpen ? "popup_opened" : ""
      }`}
      ref={popupRef}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
          aria-label="Закрыть"
        ></button>
        <img
          className="popup__info-tooltip-image"
          src={sucsessImage}
          alt={`Статус регистрации (удачная или нет)`}
        />
        <h3 className="popup__title popup__title_info-tooltip">
          {props.message}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
