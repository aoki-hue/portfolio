"use client";

import { motion } from "motion/react";
import SkillCard from "@/components/common/SkillsCard";
import type { SkillCardProps } from "@/types/card";
import styles from "./Skills.module.scss";

type Props = {
  skills: SkillCardProps[];
};

const SkillsClient = ({ skills }: Props) => {
  return (
    <motion.div
      className={styles.skills}
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
      {skills.map((card, index) => (
        <SkillCard
          key={card.id ?? index}
          src={card.src}
          skill={card.skill}
          description={card.description}
          level={card.level}
        />
      ))}
    </motion.div>
  );
};

export default SkillsClient;
