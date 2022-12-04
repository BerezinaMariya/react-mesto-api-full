import { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { FormValidator } from "../FormValidator/FormValidator";

function EditAvatarPopup(props) {
  const { values, handleChange, errors, handleOpenForm, isFormValid, resetForm } = FormValidator();
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
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
        type="url"
        name="avatar"
        id="input-avatar-url"
        ref={avatarRef}
        placeholder="Ссылка на картинку"
        className={`form__input ${errors.avatar & errors.avatar !== '' ? "form__input_type_error" : ""}`}
        required
        value={`${values.avatar ? values.avatar : ''}`}
        onChange={handleChange}
      />
      <span
        name="avatar"
        className={`form__input-error ${!isFormValid ? "form__input-error_active" : ""}`}>
          {`${errors.avatar ? errors.avatar : ''}`}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;