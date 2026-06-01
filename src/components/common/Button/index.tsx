import clsx from "clsx";
import styles from "./Button.module.scss";

type Props = {
  text: string;
  addClass?: keyof typeof styles;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ text, addClass, type, onClick }: Props) => {
  return (
    <button
      className={clsx(styles.button, addClass && styles[addClass])}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
