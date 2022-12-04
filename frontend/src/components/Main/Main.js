import { useContext } from "react";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CardsContext } from "../../contexts/CardsContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const cardsList = useContext(CardsContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__personal-data">
          <div className="profile__avatar">
            <img
              className="profile__avatar-image"
              src={currentUser.avatar}
              alt={`Аватар пользователя ${currentUser.name}`}
            />
            <button
              type="button"
              className="profile__avatar-edit-button"
              onClick={props.onEditAvatar}
              aria-label="Редактировать аватар"
            ></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__about">{currentUser.about}</p>
            <button
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfile}
              aria-label="Редактировать данные"
            ></button>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
          aria-label="Добавить карточку"
        ></button>
      </section>
      <section>
        <div className="cards">
          {cardsList.map((card) => (
            <Card
              key={card._id}
              card={card}
              currentUser={currentUser}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDeleteClick={props.onCardDeleteClick}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
