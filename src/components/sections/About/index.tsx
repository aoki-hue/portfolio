"use client";

import { motion } from "motion/react";
import Image from "next/image";
import SectionContainer from "@/components/common/SectionContainer";
import AboutCard from "@/components/common/AboutCard";
import { aboutCardData } from "@/data/aboutCards";
import styles from "./About.module.scss";

const About = () => {
  return (
    <SectionContainer id="about" title="About" text="自己紹介" isBg={true}>
      <div className={styles.about__inner}>
        <motion.div
          className={styles.about}
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          {/* <div className={styles.about}> */}
          <div className={styles.about__img}>
            <Image
              src="/images/about/about-img.png"
              alt="自己紹介"
              width={309}
              height={236}
            />
          </div>
          <dl className={styles["about-text"]}>
            <dt className={styles["about-text__title"]}>
              デザインの意図を正確に再現し、
              <br className={styles.pc} />
              保守性の高い実装を心がけています
            </dt>
            <dd className={styles["about-text__description"]}>
              マークアップエンジニアとしてHTML/CSS/JavaScriptを中心に、
              アクセシビリティ・パフォーマンス・SEOを意識したコーディングを行っています。
              <br />
              利用するユーザーにとって心地よく、長く使えるUIを作ることを大切にしています。
            </dd>
          </dl>
          {/* </div> */}
        </motion.div>
        <motion.div
          className={styles["about-conscious-wrap"]}
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          {aboutCardData.map((card, index) => (
            <AboutCard
              key={index}
              src={card.src}
              title={card.title}
              description={card.description}
            />
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  );
};

export default About;
