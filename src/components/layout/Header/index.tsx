"use client";

import Image from "next/image";
import styles from "./Header.module.scss";

const Header = () => {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Image
          src="/images/header/header-logo.svg"
          alt="ロゴ"
          width={186}
          height={46}
        />
      </div>
      <ul className={styles.navigation}>
        <li
          className={styles.navigation__list}
          onClick={() => handleScroll("about")}
        >
          About
        </li>
        <li
          className={styles.navigation__list}
          onClick={() => handleScroll("skills")}
        >
          Skills
        </li>
        <li
          className={styles.navigation__list}
          onClick={() => handleScroll("projects")}
        >
          Projects
        </li>
        <li
          className={styles.navigation__list}
          onClick={() => handleScroll("contact")}
        >
          Contact
        </li>
      </ul>
    </header>
  );
};

export default Header;
