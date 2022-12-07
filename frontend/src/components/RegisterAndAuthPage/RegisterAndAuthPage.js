import { useState, useContext } from "react";
import { RegistrationDataContext } from "../../contexts/RegistrationDataContext";

function RegisterAndAuthPage(props) {
  const registrationData = useContext(RegistrationDataContext);
 
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeUserName(evt) {
    setName(evt.target.value);
    registrationData.name = evt.target.value;
  }

  function handleChangeUserAbout(evt) {
    setAbout(evt.target.value);
    registrationData.about = evt.target.value;
  }

  function handleChangeUserAvatar(evt) {
    setAvatar(evt.target.value);
    registrationData.avatar = evt.target.value;
  }

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
        <input
          className={`form__input form__input_for_register-and-auth ${props.title !== 'Регистрация' ? "form__input_inactive" : ""}`}
          type="text"
          name="name"
          id="input-reg-name"
          placeholder="Имя пользователя"
          value={`${name}`}
          onChange={handleChangeUserName}
          disabled={props.title === 'Регистрация' ? false : true}
        />
        <input
          className={`form__input form__input_for_register-and-auth ${props.title !== 'Регистрация' ? "form__input_inactive" : ""}`}
          type="text"
          name="about"
          id="input-reg-about"
          placeholder="О себе"
          value={`${about}`}
          onChange={handleChangeUserAbout}
          disabled={props.title === 'Регистрация' ? false : true}
        />
        <input
          className={`form__input form__input_for_register-and-auth ${props.title !== 'Регистрация' ? "form__input_inactive" : ""}`}
          type="url"
          name="avatar"
          id="input-reg-avatar"
          placeholder="Ссылка на аватар"
          value={`${avatar}`}
          onChange={handleChangeUserAvatar}
          disabled={props.title === 'Регистрация' ? false : true}
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