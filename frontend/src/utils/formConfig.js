//объект настроек для валидации формы (все нужные функциям классы и селекторы элементов)
const formConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  //делает неактивной кнопку при невалидной форме
  inactiveButtonClass: "form__submit-button_inactive",
  //подчеркивает невалидное поле красной линией
  inputErrorClass: "form__input_type_error",
  //появляется сообщение об ошибке
  errorClass: "form__input-error_active",
};

export default formConfig;