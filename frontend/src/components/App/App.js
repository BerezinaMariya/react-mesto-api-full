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

function register(
  registrationData,
  setRegistrationData,
  setMessage,
  setRegOrLogSucsessStatus,
  setInfoTooltipOpen,
  history
) {
  api
    .register(registrationData.name, registrationData.about, registrationData.avatar, registrationData.email, registrationData.password )
    .then((res) => {
      if (res) {
        setMessage("Вы успешно зарегистрировались!");
        setRegOrLogSucsessStatus(true);
        setInfoTooltipOpen(true);
        setRegistrationData({});
      }
    })
    .then(() => history.push("/signin"))
    .catch(async (err) => {
      if (err.body) {
        var errBody = await err.json();
        setMessage(errBody.message);
      } else {
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
      }
      setRegOrLogSucsessStatus(false);
      setInfoTooltipOpen(true);
    });
}

function authorize(
  registrationData,
  setCurrentUser,
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
    .then(() => {
      setLoggedIn(true);
      history.push("/");
      setCurrentUser({ email: registrationData.email });
      localStorage.setItem('loggedIn', true);
    })
    .catch(async (err) => {
      if (err.body) {
        var errBody = await err.json();
        setMessage(errBody.message);
      } else {
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
      }
      setRegOrLogSucsessStatus(false);
      setInfoTooltipOpen(true);
    });
}

function getEmail( setLoggedIn, history, setCurrentUser) {
  api
    .getEmail()
    .then((res) => {
      setLoggedIn(true);
      history.push("/");
      setCurrentUser({ email: res.email });
    })
    .catch((err) => {
      alert(`${err} Проверка авторизации не пройдена`);
    });
}

function exit( setLoggedIn, history, setCurrentUser ) {
  api
    .exit()
    .then(() => {
      setLoggedIn(false);
      history.push("/signin");
      setCurrentUser({ email: "" });
      localStorage.setItem('loggedIn', false);
    })
    .catch((err) => {
      alert(`${err} Выход с сайта не выполнен`);
    });
}

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
      setCards(res.reverse());
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

function App() {
  const history = useHistory();

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isCardDeletePopupOpen, setCardDeletePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isPopupClosed, setPopupClosed] = useState(false);

  const [registrationData, setRegistrationData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [deletedCard, setDeleteCard] = useState({ name: "", link: "" });
  
  const [RegOrLogSucsessStatus, setRegOrLogSucsessStatus] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    const isLiked = card.likes.some((i) => i === currentUser._id);
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

  function handleRegister() {
    Object.keys(registrationData).forEach((i) => {
      if (registrationData[i] === '') {
        delete registrationData[i];
      }
    });
  
    register(
      registrationData,
      setRegistrationData,
      setMessage,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen,
      history
    );
  }

  function handleLoggedIn() {
    authorize(
      registrationData,
      setCurrentUser,
      setMessage,
      setLoggedIn,
      setRegOrLogSucsessStatus,
      setInfoTooltipOpen,
      history
    );
  }

  function handleTokenCheck() {
    if (localStorage.getItem('loggedIn') === 'true') {
      getEmail(setLoggedIn, history, setCurrentUser);
    }
  }

  function handleExit() {
    exit( setLoggedIn, history, setCurrentUser );
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
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} onExit={handleExit}/>
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
