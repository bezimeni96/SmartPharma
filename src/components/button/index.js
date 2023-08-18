import React from "react";

import styles from "./button.module.scss";

const Button = ({
  label,
  btnClass,
  iconLeft,
  disabled,
  onClick,
  active,
  type,
}) => {
  return (
    <button
      className={active ? styles[`${btnClass}-active`] : styles[btnClass]}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {iconLeft ? (
        <div>
          <img className={styles.iconLeft} src={iconLeft} />
        </div>
      ) : null}
      {label && label}
    </button>
  );
};

export default Button;
