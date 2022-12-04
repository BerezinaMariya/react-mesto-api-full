import { useState, useContext, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { RegistrationDataContext } from "../../contexts/RegistrationDataContext";
import headerLogo from "../../images/header-logo.svg";

function Header(props) {
  const registrationData = useContext(RegistrationDataContext);

  const [email, setEmail] = useState(registrationData.email);
  const [menuButtonState, setMenuButtonState] = useState("open");
  const [menuState, setMenuState] = useState("close");

  function handleButtonClick() {
    localStorage.removeItem("jwt");
    props.setLoggedIn(false);
    setEmail("");
  }

  function handleMenuButtonClick() {
    if (menuButtonState === "open") {
      setMenuButtonState("close");
      setMenuState("open");
    } else {
      setMenuButtonState("open");
      setMenuState("close");
    }
  }

  useEffect(() => {
    if (props.loggedIn) {
      setEmail(registrationData.email);
    } else {
      setMenuButtonState("open");
      setMenuState("close");
      setEmail("");
    }
  }, [props.loggedIn]);

  return (
    <header
      className={`header ${props.loggedIn ? "header_logged-in" : ""} : ''}`}
    >
      <img
        className="header__logo"
        src={headerLogo}
        alt="Логотип проекта Место"
      />
      <button
        type="button"
        onClick={handleMenuButtonClick}
        className={`${
          props.loggedIn
            ? `header__menu-button header__menu-button_type_${menuButtonState}`
            : "header__menu-button_hidden"
        }`}
      ></button>
      <div
        className={`header__menu ${
          props.loggedIn ? `header__menu_state_${menuState}` : ""
        }`}
      >
        <p className="header__menu-email">{`${email}`}</p>

        <Switch>
          <Route path="/signup">
            <Link
              to="/signin"
              className={`header__menu-link ${
                props.loggedIn ? "header__menu-link_logged-in" : ""
              }`}
            >
              Войти
            </Link>
          </Route>
          <Route path="/signin">
            <Link
              to="/signup"
              className={`header__menu-link ${
                props.loggedIn ? "header__menu-link_logged-in" : ""
              }`}
            >
              Регистрация
            </Link>
          </Route>
          <Route exact path="/">
            <Link
              to="/signin"
              onClick={handleButtonClick}
              className={`header__menu-link ${
                props.loggedIn ? "header__menu-link_logged-in" : ""
              }`}
            >
              Выйти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
