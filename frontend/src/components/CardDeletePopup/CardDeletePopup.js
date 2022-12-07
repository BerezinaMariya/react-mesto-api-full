import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { FormValidator } from "../FormValidator/FormValidator";

function CardDeletePopup(props) {
  const { handleOpenForm, isFormValid } = FormValidator();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={props.isOpen}
      isClosed={props.isClosed}
      setClosed={props.setClosed}
      onClose={props.onClose}
      onCloseByOverlay={props.onCloseByOverlay}
      onCloseByEsc={props.onCloseByEsc}
      onSubmit={handleSubmit}
      isOpenFormValid={handleOpenForm}
      isFormValid={isFormValid}
      isLoading={props.isLoading}
    />
  );
}

export default CardDeletePopup;
