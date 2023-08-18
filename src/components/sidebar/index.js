import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import useWindowDimensions from "../../utils/screenSize";

import { FaBars, FaUserAlt, FaRegChartBar, FaThList } from "react-icons/fa";

import styles from "./sidebar.module.scss";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useWindowDimensions();

  useEffect(() => {
    if (isOpen && isMobile) setIsOpen(false);
  }, [isMobile]);

  const toggle = () => setIsOpen((prevState) => !prevState);

  const menuItems = [
    {
      path: "/products",
      title: "Products",
      icon: <FaThList />,
    },
    {
      path: "/about",
      title: "About",
      icon: <FaUserAlt />,
    },
    {
      path: "/statistics",
      title: "Statistics",
      icon: <FaRegChartBar />,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div
        className={`
          ${styles.sidebar}
          ${isOpen ? styles.opened : styles.closed}
        `}
      >
        {!isMobile ? (
          <div className={styles.topSection}>
            {isOpen ? <h1 className={styles.logo}>SmartPharma</h1> : null}
            <div
              className={`
              ${styles.menu}
              ${isOpen ? styles.opened : ""}
            `}
            >
              <FaBars onClick={toggle} />
            </div>
          </div>
        ) : (
          <div className={styles.topSection}>
            <b>SM</b>
          </div>
        )}

        {menuItems.map((item, index) => (
          <NavLink to={item.path} key={index} className={styles.link}>
            <div className={styles.icon}>{item.icon}</div>
            {isOpen ? (
              <div className={styles.linkTitle}>{item.title}</div>
            ) : null}
          </NavLink>
        ))}
      </div>

      <main
        className={`${styles.main} ${isOpen ? styles.opened : styles.closed}`}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
