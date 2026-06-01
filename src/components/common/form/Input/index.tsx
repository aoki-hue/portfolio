import styles from "./Input.module.scss";

type Props = {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
};

const Input = ({ id, label, type, value, onChange }: Props) => {
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
    </div>
  );
};

export default Input;
