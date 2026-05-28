import clsx from "clsx";
import Image from "next/image";
import styles from "./SkillsCard.module.scss";
import { SkillCardProps } from "@/types/card";

const SkillCard = ({ src, skill, description, level }: SkillCardProps) => {
  return (
    <div className={styles["skill-card"]}>
      <div
        className={clsx(
          styles["skill-card__img"],
          styles[`skill-card__img--${src}`],
        )}
      >
        <Image
          src={`/images/skills/${src}.svg`}
          alt={src}
          width={40}
          height={40}
        />
      </div>
      <dl>
        <dt className={styles["skill-card__title"]}>{skill}</dt>
        <dd className={styles["skill-card__description"]}>{description}</dd>
      </dl>
      <div className={styles["skill-level"]}>
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className={clsx(
              styles["skill-level__scale"],
              index < level && styles[`skill-level__scale--${src}`],
            )}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;
