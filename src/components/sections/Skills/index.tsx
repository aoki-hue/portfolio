import SectionContainer from "@/components/common/SectionContainer";
import SkillsClient from "./SkillsClient";
import { client } from "@/lib/microcms";
import type { SkillCardProps } from "@/types/card";

const Skills = async () => {
  const skillCardData = await client.get<{ contents: SkillCardProps[] }>({
    endpoint: "skills",
  });

  return (
    <SectionContainer id="skills" title="Skills" text="言語・ツール">
      <SkillsClient skills={skillCardData.contents} />
    </SectionContainer>
  );
};

export default Skills;
