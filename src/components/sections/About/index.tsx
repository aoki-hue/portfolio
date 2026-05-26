import clsx from "clsx";
import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle";
import styles from "./About.module.scss";

type Props = {
  isBg: boolean;
};

const About = ({ isBg }: Props) => {
  return (
    <div className={clsx(styles.section, isBg && styles["section-bg"])}>
      <SectionTitle sectionTitle={"About"} text={"自己紹介"} />
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
    </div>
  );
};

export default About;
