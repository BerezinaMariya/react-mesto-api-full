function Card(props) {
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === props.currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `cardElement__delete-button ${
    isOwn ? "" : "cardElement__delete-button_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === props.currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `cardElement__like-button ${
    isLiked ? "cardElement__like-button_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDeleteClick() {
    props.onCardDeleteClick(props.card);
  }

  return (
    <article className="cardElement">
      <img
        className="cardElement__image"
        src={props.card.link}
        onClick={handleClick}
        alt={`Фотография места ${props.card.name}`}
      />
      <div className="cardElement__caption">
        <h2 className="cardElement__title">{props.card.name}</h2>
        <div className="cardElement__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="cardElement__likes">{props.card.likes.length}</p>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="Удалить"
        onClick={handleCardDeleteClick}
      ></button>
    </article>
  );
}

export default Card;
