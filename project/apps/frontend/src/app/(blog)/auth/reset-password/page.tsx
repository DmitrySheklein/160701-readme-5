import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Страница сброса пароля',
};

export default function Page() {
  return (
    <>
      <h1 className="page__title">Сброс пароля</h1>

      <section className="recovery">
        <h2 className="visually-hidden">Форма сброса пароля</h2>
        <form className="login__form form" action="#" method="post">
          <div className="login__input-wrapper form__input-wrapper">
            <label className="login__label form__label" htmlFor="token">
              Токен восстановления
            </label>
            <div className="form__input-section">
              <input
                className="login__input form__input"
                id="token"
                type="text"
                name="token"
                placeholder="Укажите токен"
              />
            </div>
          </div>
          <div className="login__input-wrapper form__input-wrapper">
            <label
              className="login__label form__label"
              htmlFor="login-password"
            >
              Новый пароль
            </label>
            <div className="form__input-sections">
            <div className="form__input-section">
                <input
                  className="login__input form__input"
                  id="login-password"
                  type="password"
                  name="password"
                  placeholder="Введите новый пароль"
                />
              </div>
              <div className="form__input-section">
                <input
                  className="login__input form__input"
                  id="login-password"
                  type="password"
                  name="password"
                  placeholder="Повторите новый пароль"
                />
              </div>
            </div>
          </div>
          <button className="login__submit button button--main" type="submit">
            Отправить
          </button>
        </form>
      </section>
    </>
  );
}
