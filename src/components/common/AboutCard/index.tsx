import Image from "next/image";
import styles from "./AboutCard.module.scss";
import { AboutCardProps } from "@/types/card";

const AboutCard = ({ src, title, description }: AboutCardProps) => {
  return (
    <div className={styles["about-conscious"]}>
      <div className={styles["about-conscious__img"]}>
        <Image src={`/images/about/${src}.svg`} alt={src} fill />
      </div>
      <dl>
        <dt className={styles["about-conscious__title"]}>{title}</dt>
        <dd className={styles["about-conscious__description"]}>
          {description}
        </dd>
      </dl>
    </div>
  );
};

export default AboutCard;
