import { Link } from "react-router-dom";
import RegisterAndAuthPage from "../RegisterAndAuthPage/RegisterAndAuthPage";


function Register(props) {

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister();
  }

  return (
    <RegisterAndAuthPage
      title="Регистрация"
      submitButtonText="Зарегистрироваться"
      onSubmit={handleSubmit}
    >
      <div className="register__signin">
        <p className="register__signin-text">Уже зарегистрированы?</p>
        <Link
          to="./signin"
          className="register__signin-link"
        >
          Войти
        </Link>
      </div>
    </RegisterAndAuthPage>
  );
}

export default Register;
