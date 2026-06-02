import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles["footer__copyright"]}>© 2025 Nozomu Aoki.</p>
    </footer>
  );
};

export default Footer;
