import { AppRouter } from '@/shared/consts/AppRouter';
import { Footer } from '@/components/Footer/Footer';
import { Icons } from '@/components/Icons/Icons';
// import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default async function Index() {
  return (
    <div className="page">
      <header className="header page__header">
        <div className="header__wrapper page__header-wrapper container">
          <div className="header__logo-wrapper page__logo-wrapper">
            <a className="header__logo-link header__logo-link--active">
              <img
                className="header__logo"
                src="/img/logo.svg"
                alt="Логотип readme"
                width="172"
                height="32"
              />
            </a>
            <p className="header__topic page__header-topic">micro blogging</p>
          </div>
          <div className="header__nav-wrapper">
            <nav className="header__nav">
              <ul className="header__user-nav">
                <li>
                  <Link
                    className="header__user-button header__register-button button button--transparent"
                    href={AppRouter.Register}
                  >
                    Регистрация
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <h1 className="visually-hidden">
          Главная страница сайта по созданию микроблога readme
        </h1>
        <div className="page__main-wrapper page__main-wrapper--intro container">
          <section className="intro">
            <h2 className="visually-hidden">Наши преимущества</h2>
            <b className="intro__slogan">
              Блог, каким
              <br /> он должен быть
            </b>
            <ul className="intro__advantages-list">
              <li className="intro__advantage">
                <Image
                  className="intro__advantage-image intro__advantage--ease"
                  src="img/everything.svg"
                  width={86}
                  height={36}
                  alt=""
                />
                <p className="intro__advantage-text">
                  Есть все необходимое для&nbsp;простоты публикации
                </p>
              </li>
              <li className="intro__advantage">
                <Image
                  className="intro__advantage-image intro__advantage--no-excess"
                  src="img/no-games.svg"
                  width={70}
                  height={58}
                  alt=""
                />
                <p className="intro__advantage-text">
                  Нет ничего лишнего, отвлекающего от сути
                </p>
              </li>
            </ul>
          </section>
          <section className="authorization" hidden>
            <h2 className="visually-hidden">Авторизация</h2>
            <form className="authorization__form form" action="#" method="post">
              <div className="authorization__input-wrapper form__input-wrapper">
                <div className="form__input-section form__input-section--error">
                  <input
                    className="authorization__input authorization__input--login form__input"
                    type="text"
                    name="login"
                    placeholder="Логин"
                  />
                  <svg className="form__input-icon" width="19" height="18">
                    <use xlinkHref="#icon-input-user"></use>
                  </svg>
                  <label className="visually-hidden">Логин</label>
                </div>
                <span className="form__error-label form__error-label--login">
                  Неверный логин
                </span>
              </div>
              <div className="authorization__input-wrapper form__input-wrapper">
                <div className="form__input-section form__input-section--error">
                  <input
                    className="authorization__input authorization__input--password form__input"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                  />
                  <svg className="form__input-icon" width="16" height="20">
                    <use xlinkHref="#icon-input-password"></use>
                  </svg>
                  <label className="visually-hidden">Пароль</label>
                </div>
                <span className="form__error-label">Пароли не совпадают</span>
              </div>
              <a className="authorization__recovery" href="#">
                Забыли пароль?
              </a>
              <button
                className="authorization__submit button button--main"
                type="submit"
              >
                Войти
              </button>
            </form>
          </section>
          <section className="authorization">
            <h2 className="visually-hidden">Авторизация</h2>
            <form className="authorization__form form" action="#" method="post">
              <div className="authorization__input-wrapper form__input-wrapper">
                <input
                  className="authorization__input authorization__input--login form__input"
                  type="text"
                  name="login"
                  placeholder="Логин"
                />
                <svg className="form__input-icon" width="19" height="18">
                  <use xlinkHref="#icon-input-user"></use>
                </svg>
                <label className="visually-hidden">Логин</label>
                <span className="form__error-label form__error-label--login">
                  Неверный логин
                </span>
              </div>
              <div className="authorization__input-wrapper form__input-wrapper">
                <input
                  className="authorization__input authorization__input--password form__input"
                  type="password"
                  name="password"
                  placeholder="Пароль"
                />
                <svg className="form__input-icon" width="16" height="20">
                  <use xlinkHref="#icon-input-password"></use>
                </svg>
                <label className="visually-hidden">Пароль</label>
                <span className="form__error-label">Пароли не совпадают</span>
              </div>
              <Link
                className="authorization__recovery"
                href={AppRouter.Recovery}
              >
                Забыли пароль?
              </Link>
              <button
                className="authorization__submit button button--main"
                type="submit"
              >
                Войти
              </button>
            </form>
          </section>
        </div>
      </main>
      <Footer isIndex />
      <Icons />
    </div>
  );
}
