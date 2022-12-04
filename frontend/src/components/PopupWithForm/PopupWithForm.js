import { useRef, useEffect } from "react";

function PopupWithForm(props) {
  const submitButtonTextRef = useRef();
  const formRef = useRef();
  const popupRef = useRef();

  const renderLoading = () => {
    if (!props.isLoading) {
      return (submitButtonTextRef.current = props.buttonText);
    } else {
      return (submitButtonTextRef.current = "Сохранение...");
    }
  };

  useEffect(() => {
    props.onCloseByOverlay(popupRef.current);
  }, []);

  useEffect(() => {
    props.setClosed(false);
    if (props.isOpen) {
      props.isOpenFormValid(formRef.current);

      // Список действий внутри одного хука
      document.addEventListener("keydown", props.onCloseByEsc);
      // Возвращаем функцию, которая удаляет эффекты
      return () => {
        document.removeEventListener("keydown", props.onCloseByEsc);
      };
    } 
  }, [props.isOpen]);

  useEffect(() => {
    if (props.isClosed) {
      if (props.resetForm) {
        props.resetForm();
      } else {
        formRef.current.reset();
      }
    }
    props.onClose();    
  }, [props.isClosed]);

  return (
    <div
      className={`popup popup_action_${props.name} ${
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
        <h3 className="popup__title">{`${props.title}`}</h3>
        <form
          name={`form_action_${props.name}`}
          className={`form form_action_${props.name}`}
          ref={formRef}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button
            type="submit"
            className={`form__submit-button ${!props.isFormValid ? "form__submit-button_inactive" : ""}`}
            ref={submitButtonTextRef}
            disabled={props.isFormValid ? false : true}
          >
            {renderLoading()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;