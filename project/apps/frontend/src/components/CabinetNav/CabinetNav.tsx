import Image from 'next/image';

export const CabinetNav = () => {
  return (
    <>
      <ul className="header__my-nav">
        <li className="header__my-page header__my-page--popular">
          <a
            className="header__page-link"
            href="popular.html"
            title="Популярный контент"
          >
            <Image
              className="header__page-icon"
              src="/img/icons/popular.svg"
              width={32}
              height={32}
              alt=""
            />
            <span className="visually-hidden">Популярный контент</span>
          </a>
        </li>
        <li className="header__my-page header__my-page--feed">
          <a className="header__page-link" href="feed.html" title="Моя лента">
            <Image
              className="header__page-icon"
              src="/img/icons/feed.svg"
              width={32}
              height={32}
              alt=""
            />
            <span className="visually-hidden">Моя лента</span>
          </a>
        </li>
        <li className="header__my-page header__my-page--messages">
          <a
            className="header__page-link"
            href="messages.html"
            title="Личные сообщения"
          >
            <Image
              className="header__page-icon"
              src="/img/icons/messages.svg"
              width={32}
              height={32}
              alt=""
            />
            <span className="visually-hidden">Личные сообщения</span>
          </a>
        </li>
      </ul>
    </>
  );
};
