import styles from "./Input.module.scss";

type Props = {
  id: string;
  label: string;
  type: string;
  value: string;
  error: string | undefined;
  onChange: (value: string) => void;
};

const Input = ({ id, label, type, value, error, onChange }: Props) => {
  return (
    <div className={styles.input}>
      <label htmlFor={id} className={styles.input__label}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={styles.input__field}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
