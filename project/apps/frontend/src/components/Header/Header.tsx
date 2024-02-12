import { AppRouter } from '@/shared/consts/AppRouter';
import Link from 'next/link';
import { CabinetNav } from '../CabinetNav/CabinetNav';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper container">
        <div className="header__logo-wrapper">
          <Link className="header__logo-link" href="/">
            <img
              className="header__logo"
              src="/img/logo.svg"
              alt="Логотип readme"
              width="128"
              height="24"
            />
          </Link>
          <p className="header__topic">micro blogging</p>
        </div>
        <form
          className="header__search-form form"
          action="#"
          method="get"
          hidden
        >
          <div className="header__search">
            <label className="visually-hidden">Поиск</label>
            <input className="header__search-input form__input" type="search" />
            <button className="header__search-button button" type="submit">
              <svg className="header__search-icon" width="18" height="18">
                <use xlinkHref="#icon-search"></use>
              </svg>
              <span className="visually-hidden">Начать поиск</span>
            </button>
          </div>
        </form>
        <div className="header__nav-wrapper">
          <nav className="header__nav">
            {/* <CabinetNav /> */}
            <ul className="header__user-nav">
              <li className="header__authorization">
                <Link
                  className="header__user-button  header__authorization-button button"
                  href={AppRouter.Login}
                >
                  Вход
                </Link>
              </li>
              <li>
                <Link
                  className="header__user-button header__register-button button"
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
  );
};
