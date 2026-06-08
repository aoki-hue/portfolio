export type AboutCardProps = {
  id?: number;
  src: string;
  title: string;
  description: string;
};

export type SkillCardProps = {
  id?: number;
  src: string;
  skill: string;
  description: string;
  level: number;
};

export type ProjectListProps = {
  id?: number;
  src: string;
  link: string;
  text: string;
};
