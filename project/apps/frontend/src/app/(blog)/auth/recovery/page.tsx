import { AppRouter } from '@/shared/consts/AppRouter';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Забыли пароль?',
};

export default function Page() {
  return (
    <>
      <h1 className="page__title">Восстановление пароля</h1>

      <section className="recovery">
        <h2 className="visually-hidden">Форма восстановления пароля</h2>
        <form className="login__form form" action="#" method="post">
          <div className="login__input-wrapper form__input-wrapper">
            <label
              className="login__label form__label"
              htmlFor="recovery-email"
            >
              Электронная почта
            </label>
            <div className="form__input-section">
              <input
                className="login__input form__input"
                id="recovery-email"
                type="email"
                name="email"
                placeholder="Укажите эл.почту"
              />
            </div>
          </div>
          <button className="login__submit button button--main" type="submit">
            Отправить
          </button>
          <Link className="login__recovery" href={AppRouter.ResetPassword}>
            Страница сброса пароля
          </Link>
        </form>
      </section>
    </>
  );
}
