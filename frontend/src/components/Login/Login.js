import RegisterAndAuthPage from "../RegisterAndAuthPage/RegisterAndAuthPage";

function Login(props) {

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin();
  }

  return (
    <RegisterAndAuthPage
      title="Вход"
      submitButtonText="Войти"
      onSubmit={handleSubmit}
    />
  );
}

export default Login;