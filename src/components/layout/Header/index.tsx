"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import styles from "./Header.module.scss";

const Header = () => {
  const handleScrollSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const [isCompact, setIsCompact] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) return;

    const heroHeight = hero.offsetHeight;

    const handleScroll = () => {
      setIsCompact(window.scrollY > heroHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          onClick={() => handleScrollSection("about")}
        >
          About
        </li>
        <li
          className={styles.navigation__list}
          onClick={() => handleScrollSection("skills")}
        >
          Skills
        </li>
        <li
          className={styles.navigation__list}
          onClick={() => handleScrollSection("projects")}
        >
          Projects
        </li>
        <li
          className={styles.navigation__list}
          onClick={() => handleScrollSection("contact")}
        >
          Contact
        </li>
      </ul>
      <button
        className={clsx(styles.header__hamburger, {
          [styles["header__hamburger--compact"]]: isCompact,
        })}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu size={48} />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              className={styles.menu}
              initial={{
                opacity: 0,
                x: "100%",
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: "100%",
              }}
            >
              <button
                className={styles.menu__close}
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={32} />
              </button>
              <nav>
                <ul className={styles.menu__navigation}>
                  <li
                    className={styles.menu__list}
                    onClick={() => {
                      handleScrollSection("about");
                      setIsMenuOpen(false);
                    }}
                  >
                    About
                  </li>
                  <li
                    className={styles.menu__list}
                    onClick={() => {
                      handleScrollSection("skills");
                      setIsMenuOpen(false);
                    }}
                  >
                    Skills
                  </li>
                  <li
                    className={styles.menu__list}
                    onClick={() => {
                      handleScrollSection("projects");
                      setIsMenuOpen(false);
                    }}
                  >
                    Projects
                  </li>
                  <li
                    className={styles.menu__list}
                    onClick={() => {
                      handleScrollSection("contact");
                      setIsMenuOpen(false);
                    }}
                  >
                    Contact
                  </li>
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
