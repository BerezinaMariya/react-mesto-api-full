import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { FormValidator } from "../FormValidator/FormValidator";

function AddPlacePopup(props) {
  const { values, handleChange, errors, handleOpenForm, isFormValid, resetForm } = FormValidator();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      isClosed={props.isClosed}
      setClosed={props.setClosed}
      onClose={props.onClose}
      onCloseByOverlay={props.onCloseByOverlay}
      onCloseByEsc={props.onCloseByEsc}
      onSubmit={handleSubmit}
      resetForm={resetForm}
      isOpenFormValid={handleOpenForm}
      isFormValid={isFormValid}
      isLoading={props.isLoading}
    >
      <input
        type="text"
        name="name"
        id="input-image-name"
        placeholder="Название"
        className={`form__input ${errors.name & errors.name !== '' ? "form__input_type_error" : ""}`}
        required
        minLength="2"
        maxLength="30"
        value={`${values.name ? values.name : ''}`}
        onChange={handleChange}
      />
      <span
        name="name"
        className={`form__input-error ${!isFormValid ? "form__input-error_active" : ""}`}>
          {`${errors.name ? errors.name : ''}`}
        </span>
      <input
        type="url"
        name="link"
        id="input-link"
        placeholder="Ссылка на картинку"
        className={`form__input ${errors.link & errors.link !== '' ? "form__input_type_error" : ""}`}
        required
        value={`${values.link ? values.link : ''}`}
        onChange={handleChange}
      />
      <span
        name="link"
        className={`form__input-error ${!isFormValid ? "form__input-error_active" : ""}`}>
          {`${errors.link ? errors.link : ''}`}
        </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;