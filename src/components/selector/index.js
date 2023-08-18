import React from "react";

import Select from "react-select";

import "./selector.scss";
import styles from "./selector.module.scss";

const Selector = ({
  selectClassname = "",
  options,
  label,
  selectedOption,
  handleChangeSelect,
  placeholder,
  multiselect = false,
  disabled = false,
  error = false,
  errorMessage,
}) => {
  const selectorClass = selectClassname.split("'").join("");

  return (
    <div className={styles.wrapper}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <Select
        isMulti={multiselect}
        className={selectorClass}
        classNamePrefix={selectorClass}
        value={selectedOption}
        onChange={handleChangeSelect}
        options={options}
        getOptionLabel={(option) => option.label}
        placeholder={placeholder}
        isDisabled={disabled}
      />
      <span className={styles.errorMessage}>{error ? errorMessage : ""}</span>
    </div>
  );
};

export default Selector;
