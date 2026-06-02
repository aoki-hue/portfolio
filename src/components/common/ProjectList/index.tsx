import Link from "next/link";
import Image from "next/image";
import styles from "./ProjectList.module.scss";
import "keen-slider/keen-slider.min.css";
import { ProjectListProps } from "@/types/card";

const SkillCard = ({ src, link, text }: ProjectListProps) => {
  return (
    <li className={styles.project}>
      <Link href={link} target="_blank" rel="noopener noreferrer">
        <div>
          <div className={styles["project__img"]}>
            <Image
              src={`/images/projects/${src}.png`}
              alt={src}
              width={226}
              height={148}
            />
          </div>
          <p className={styles["project__text"]}>{text}</p>
        </div>
      </Link>
    </li>
  );
};

export default SkillCard;
