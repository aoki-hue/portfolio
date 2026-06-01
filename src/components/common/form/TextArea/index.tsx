import styles from "./TextArea.module.scss";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const TextArea = ({ id, label, value, onChange }: Props) => {
  return (
    <div className={styles.textarea}>
      <label htmlFor={id} className={styles.textarea__label}>
        {label}
      </label>
      <textarea
        id={id}
        className={styles.textarea__field}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextArea;
