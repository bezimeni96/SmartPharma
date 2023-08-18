import React from "react";

import styles from "./input.module.scss";

const Input = ({
  name,
  type = "text",
  value,
  label,
  placeholder,
  onChange,
  error,
  errorMessage,
  otherProps = {},
}) => {
  return (
    <div className={styles.wrapper}>
      {label ? (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      ) : null}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        className={`${styles.input} ${error ? styles.error : ""}`}
        onChange={onChange}
        {...otherProps}
      />

      <span className={styles.errorMessage}>{error ? errorMessage : ""}</span>
    </div>
  );
};

export default Input;
