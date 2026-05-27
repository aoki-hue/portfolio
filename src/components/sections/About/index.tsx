import Image from "next/image";
import SectionContainer from "@/components/common/SectionContainer";
import AboutCard from "@/components/common/AboutCard";
import { aboutCardData } from "@/data/aboutCards";
import styles from "./About.module.scss";

const About = () => {
  return (
    <SectionContainer title="About" text="自己紹介" isBg={true}>
      <div className={styles.about__inner}>
        <div className={styles.about}>
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
        </div>
        <div className={styles["about-conscious-wrap"]}>
          {aboutCardData.map((card) => (
            <AboutCard
              key={card.key}
              src={card.src}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default About;
