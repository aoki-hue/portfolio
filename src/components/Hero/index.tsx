import Image from "next/image";
import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.hero__inner}>
        <div className={styles.hero__textArea}>
          <h1 className={styles.hero__lead}>
            丁寧で
            <br />
            長く使えるUIを
          </h1>
          <p className={styles.hero__text}>HTML / CSS / Sass / JavaScript</p>
        </div>
        <Image
          src="/images/hero/hero.png"
          alt="ヒーローイメージ"
          width={400}
          height={392}
        />
      </div>
    </div>
  );
};

export default Hero;
