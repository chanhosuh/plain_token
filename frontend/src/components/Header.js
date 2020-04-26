import React from "react";
import styles from "./Header.module.sass";

const HeaderItem = props => {
  return <div className={styles.header_item}>{props.children}</div>;
};

const Header = props => {
  return <header className={styles.header}>{props.children}</header>;
};

export { Header, HeaderItem };
