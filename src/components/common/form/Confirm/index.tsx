import styles from "./Confirm.module.scss";

type Props = {
  label: string;
  value: string;
};

const Confirm = ({ label, value }: Props) => {
  return (
    <div className={styles.confirm}>
      <p className={styles.confirm__label}>{label}</p>
      <p className={styles.confirm__field}>{value}</p>
    </div>
  );
};

export default Confirm;
