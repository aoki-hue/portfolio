import clsx from "clsx";
import { ReactNode } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import styles from "./SectionContainer.module.scss";

type Props = {
  title: string;
  text: string;
  isBg?: boolean;
  children: ReactNode;
};

const SectionContainer = ({ title, text, isBg, children }: Props) => {
  return (
    <div className={clsx(styles.section, isBg && styles["section-bg"])}>
      <SectionTitle sectionTitle={title} text={text} />
      {children}
    </div>
  );
};

export default SectionContainer;
