import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import CardDeletePopup from "../CardDeletePopup/CardDeletePopup";
import ImagePopup from "../ImagePopup/ImagePopup";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { api } from "../../utils/Api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CardsContext } from "../../contexts/CardsContext";
import { RegistrationDataContext } from "../../contexts/RegistrationDataContext";

function getUserInfo(setCurrentUser) {
  api
    .getUserInfo()
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      alert(`${err} Данные пользователя не загружены`);
    });
}

function setUserInfo(user, setCurrentUser, setLoading, setPopupClosed) {
  setLoading(true);
  setPopupClosed(false);

  api
    .setUserInfo(user)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      alert(`${err} Данные пользователя не обновились`);
    })
    .finally(() => {
      setLoading(false);
      setPopupClosed(true);
    });
}

function setUserAvatar(avatar, setCurrentUser, setLoading, setPopupClosed) {
  setLoading(true);
  setPopupClosed(false);

  api
    .setAvatar(avatar)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      alert(`${err} Аватар не обновился`);
    })
    .finally(() => {
      setLoading(false);
      setPopupClosed(true);
    });
}

function getInitialCards(setCards) {
  api
    .getInitialCards()
    .then((res) => {
      setCards(res);
    })
    .catch((err) => {
      alert(`${err} Карточки не загружены`);
    });
}

// Отправляем запрос в API и получаем обновлённые данные карточки
function changeLikeCardStatus(card, isLiked, setCards) {
  api
    .changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch((err) => {
      alert(`${err} Лайк не изменился`);
    });
}

function deleteCard(card, setCards, setLoading, setPopupClosed) {
  setLoading(true);
  setPopupClosed(false);

  api
    .deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      alert(`${err} Карточка не удалилась`);
    })
    .finally(() => {
      setLoading(false);
      setPopupClosed(true);
    });
}

function setNewCard(newCard, cards, setCards, setLoading, setPopupClosed) {
  setLoading(true);
  setPopupClosed(false);

  api
    .setNewCard(newCard)
    .then((res) => {
      setCards([res, ...cards]);
    })
    .catch((err) => {
      alert(`${err} Карточка не создана`);
    })
    .finally(() => {
      setLoading(false);
      setPopupClosed(true);
    });
}

function register(
  registrationData,
  setMessage,
  setRegOrLogSucsessStatus,
  setInfoTooltipOpen,
  history
) {
  api
    .register(registrationData.password, registrationData.email)
    .then((res) => {
      if (res) {
        setMessage("Вы успешно зарегистрировались!");
        setRegOrLogSucsessStatus(true);
        setInfoTooltipOpen(true);
      }
    })
    .then(() => history.push("/signin"))
    .catch((err) => {
      setMessage(err.message || "Что-то пошло не так! Попробуйте ещё раз.");
      setRegOrLogSucsessStatus(false);
      setInfoTooltipOpen(true);
    });
}

function authorize(
  registrationData,
  setMessage,
  setLoggedIn,
  setRegOrLogSucsessStatus,
  setInfoTooltipOpen,
  history
) {
  if (!registrationData.password || !registrationData.email) {
    return;
  }
  api
    .authorize(registrationData.password, registrationData.email)
    .then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
      } else {
        return;
      }
    })
    .then(() => {
      setLoggedIn(true);
      history.push("/");
    })
    .catch((err) => {
      setMessage(err.message || "Что-то пошло не так! Попробуйте ещё раз.");
      setRegOrLogSucsessStatus(false);
      setInfoTooltipOpen(true);
    });
}

function getEmail(jwt, setLoggedIn, history, setRegistrationData) {
  api
    .getEmail(jwt)
    .then((res) => {
      if (res) {
        setLoggedIn(true);
        history.push("/");
        setRegistrationData({ email: res.data.email });
      }
    })
    .catch((err) => {
      alert(`${err} Проверка токена не пройдена`);
    });
}

function App() {
  const history = useHistory();

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isCardDeletePopupOpen, setCardDeletePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [deletedCard, setDeleteCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [registrationData, setRegistrationData] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [RegOrLogSucsessStatus, setRegOrLogSucsessStatus] = useState(false);
  const [isPopupClosed, setPopupClosed] = useState(false);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardDeleteClick(card) {
    setDeleteCard(card);
    setCardDeletePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setCardDeletePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    changeLikeCardStatus(card, isLiked, setCards);
  }

  function handleCardDelete(card) {
    deleteCard(card, setCards, setLoading, setPopupClosed);
  }

  function handleUpdateUser(user) {
    setUserInfo(user, setCurrentUser, setLoading, setPopupClosed);
  }

  function handleUpdateAvatar(avatar) {
    setUserAvatar(avatar, setCurrentUser, setLoading, setPopupClosed);
  }

  function handleAddPlaceSubmit(newCard) {
    setNewCard(newCard, cards, setCards, setLoading, setPopupClosed);
  }

  function handleRegister() {
    register(
      registrationData,
      setMessage,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen,
      history
    );
  }

  function handleLoggedIn() {
    authorize(
      registrationData,
      setMessage,
      setLoggedIn,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen,
      history
    );
  }

  function handleTokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      getEmail(jwt, setLoggedIn, history, setRegistrationData);
    }
  }

  //Закрытие popup по клику по overlay
  function setCloseByOverlayListener(popup) {
    popup.addEventListener("mousedown", (evt) => {
      const targetClasses = evt.target.classList;
      if (targetClasses.contains("popup_opened")) {
        setPopupClosed(true);
        closeAllPopups();
      }
    });
  }

  //Закрытие popup при нажатии на Esc
  function handleCloseByEsc(evt) {
    if (evt.key === "Escape") {
      setPopupClosed(true);
      closeAllPopups();
    }
  }

  useEffect(() => {
    if (loggedIn) {
      getUserInfo(setCurrentUser);
      getInitialCards(setCards);
    }
  }, [loggedIn]);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <RegistrationDataContext.Provider value={registrationData}>
        <CardsContext.Provider value={cards}>
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Switch>
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              setCards={setCards}
              onCardLike={handleCardLike}
              onCardDeleteClick={handleCardDeleteClick}
              component={Main}
            />
            <Route path="/signin">
              <Login onLogin={handleLoggedIn} />
            </Route>
            <Route path="/signup">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            isClosed={isPopupClosed}
            setClosed={setPopupClosed}
            onClose={closeAllPopups}
            onCloseByOverlay={setCloseByOverlayListener}
            onCloseByEsc={handleCloseByEsc}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            isClosed={isPopupClosed}
            setClosed={setPopupClosed}
            onClose={closeAllPopups}
            onCloseByOverlay={setCloseByOverlayListener}
            onCloseByEsc={handleCloseByEsc}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            isClosed={isPopupClosed}
            setClosed={setPopupClosed}
            onClose={closeAllPopups}
            onCloseByOverlay={setCloseByOverlayListener}
            onCloseByEsc={handleCloseByEsc}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <CardDeletePopup
            card={deletedCard}
            isOpen={isCardDeletePopupOpen}
            isClosed={isPopupClosed}
            setClosed={setPopupClosed}
            onClose={closeAllPopups}
            onCloseByOverlay={setCloseByOverlayListener}
            onCloseByEsc={handleCloseByEsc}
            onCardDelete={handleCardDelete}
            isLoading={isLoading}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onCloseByOverlay={setCloseByOverlayListener}
            onCloseByEsc={handleCloseByEsc}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            message={message}
            isRegOrLogSucsess={RegOrLogSucsessStatus}
            onClose={closeAllPopups}
            onCloseByOverlay={setCloseByOverlayListener}
            onCloseByEsc={handleCloseByEsc}
          />
        </CardsContext.Provider>
      </RegistrationDataContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
