import { useState, useContext } from "react";
import { RegistrationDataContext } from "../../contexts/RegistrationDataContext";

function RegisterAndAuthPage(props) {
  const registrationData = useContext(RegistrationDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
    registrationData.email = evt.target.value;
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
    registrationData.password = evt.target.value;
  }

  return (
    <div className="register-and-auth">
      <h3 className="register-and-auth__title">{props.title}</h3>
      <form onSubmit={props.onSubmit} noValidate>
        <input
          className="form__input form__input_for_register-and-auth"
          type="email"
          name="email"
          id="input-email"
          placeholder="Email"
          value={`${email}`}
          onChange={handleChangeEmail}
        />
        <input
          className="form__input form__input_for_register-and-auth"
          type="password"
          name="password"
          id="input-password"
          placeholder="Пароль"
          value={`${password}`}
          onChange={handleChangePassword}
        />
        <button
          type="submit"
          className="form__submit-button form__submit-button_for_register-and-auth"
        >
          {props.submitButtonText}
        </button>
      </form>
      {props.children}
    </div>
  );
}

export default RegisterAndAuthPage;