import Image from "next/image";

import styles from "./Header.module.scss";

const Header = () => {
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
        <li className={styles.navigation__list}>About</li>
        <li className={styles.navigation__list}>Skills</li>
        <li className={styles.navigation__list}>Projects</li>
        <li className={styles.navigation__list}>Contact</li>
      </ul>
    </header>
  );
};

export default Header;
