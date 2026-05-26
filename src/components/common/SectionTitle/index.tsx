import styles from "./SectionTitle.module.scss";

type Props = {
  sectionTitle: string;
  text: string;
};

const SectionTitle = ({ sectionTitle, text }: Props) => {
  return (
    <>
      <h2 className={styles.sectionTitle}>
        {sectionTitle}
        <span className={styles.sectionTitle__text}>-{text}-</span>
      </h2>
    </>
  );
};

export default SectionTitle;
