import { motion } from "motion/react";

import Image from "next/image";
import styles from "./Hero.module.scss";

const Hero = () => {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut" as const,
      },
    },
  } as const;

  const image = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(6px)",
    },
    show: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <div className={styles.hero}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={styles.hero__inner}
      >
        <div className={styles.hero__textArea}>
          <motion.h1 variants={item} className={styles.hero__lead}>
            丁寧で
            <br />
            長く使えるUIを
          </motion.h1>
          <motion.p variants={item} className={styles.hero__text}>
            HTML / CSS / Sass / JavaScript
          </motion.p>
        </div>
        <motion.div variants={image}>
          <Image
            src="/images/hero/hero.png"
            alt="ヒーローイメージ"
            width={400}
            height={392}
          />
        </motion.div>
      </motion.div>
      <div className={styles.hero__bg}></div>
    </div>
  );
};

export default Hero;
