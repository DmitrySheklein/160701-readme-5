import { AppRouter } from '@/shared/consts/AppRouter';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Логин',
};

export default function Page() {
  return (
    <>
      <h1 className="page__title">Вход</h1>

      <section className="login">
        <h2 className="visually-hidden">Форма авторизации</h2>
        <form className="login__form form" action="#" method="post">
          <div className="login__input-wrapper form__input-wrapper">
            <label className="login__label form__label" htmlFor="login-email">
              Электронная почта
            </label>
            <div className="form__input-section">
              <input
                className="login__input form__input"
                id="login-email"
                type="email"
                name="email"
                placeholder="Укажите эл.почту"
              />
              <button className="form__error-button button" type="button">
                !<span className="visually-hidden">Информация об ошибке</span>
              </button>
              <div className="form__error-text">
                <h3 className="form__error-title">Заголовок сообщения</h3>
                <p className="form__error-desc">
                  Текст сообщения об ошибке, подробно объясняющий, что не так.
                </p>
              </div>
            </div>
          </div>
          <div className="login__input-wrapper form__input-wrapper">
            <label
              className="login__label form__label"
              htmlFor="login-password"
            >
              Пароль
            </label>
            <div className="form__input-section">
              <input
                className="login__input form__input"
                id="login-password"
                type="password"
                name="password"
                placeholder="Введите пароль"
              />
              <button
                className="form__error-button button button--main"
                type="button"
              >
                !<span className="visually-hidden">Информация об ошибке</span>
              </button>
              <div className="form__error-text">
                <h3 className="form__error-title">Заголовок сообщения</h3>
                <p className="form__error-desc">
                  Текст сообщения об ошибке, подробно объясняющий, что не так.
                </p>
              </div>
            </div>
          </div>
          <Link className="login__recovery" href={AppRouter.Recovery}>
            Забыли пароль?
          </Link>
          <button className="login__submit button button--main" type="submit">
            Отправить
          </button>
        </form>
      </section>
    </>
  );
}
