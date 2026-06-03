import styles from "./TextArea.module.scss";

type Props = {
  id: string;
  label: string;
  value: string;
  error: string;
  onChange: (value: string) => void;
};

const TextArea = ({ id, label, value, error, onChange }: Props) => {
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
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default TextArea;
