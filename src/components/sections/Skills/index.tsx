import { motion } from "motion/react";
import SectionContainer from "@/components/common/SectionContainer";
import SkillCard from "@/components/common/SkillsCard";
import { skillCardData } from "@/data/skillCards";
import styles from "./Skills.module.scss";

const Skills = () => {
  return (
    <SectionContainer id="skills" title="Skills" text="言語・ツール">
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
        {skillCardData.map((card, index) => (
          <SkillCard
            key={index}
            src={card.src}
            skill={card.skill}
            description={card.description}
            level={card.level}
          />
        ))}
      </motion.div>
    </SectionContainer>
  );
};

export default Skills;
