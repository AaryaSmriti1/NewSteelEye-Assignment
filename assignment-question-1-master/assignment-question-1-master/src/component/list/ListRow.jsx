import styles from "./ListRow.module.css";

const ListCell = ({ children,handleClick }) => {
  return <tr className={styles.cell} onClick={handleClick}>{children}</tr>;
};

export default ListCell;
