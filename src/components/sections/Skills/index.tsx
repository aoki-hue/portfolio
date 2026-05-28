// import Image from "next/image";
import SectionContainer from "@/components/common/SectionContainer";
import SkillCard from "@/components/common/SkillsCard";
import { skillCardData } from "@/data/skillCards";
import styles from "./Skills.module.scss";

const Skills = () => {
  return (
    <SectionContainer title="Skills" text="言語・ツール">
      <div className={styles.skills}>
        {skillCardData.map((card, index) => (
          <SkillCard
            key={index}
            src={card.src}
            skill={card.skill}
            description={card.description}
            level={card.level}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default Skills;
