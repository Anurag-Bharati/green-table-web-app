import styles from "@/styles/reusable/progressbar.module.scss";
const InfiniteLinearProgressBar = ({ small = false }) => {
  return (
    <div className={`${styles.MILProgressBar} ${small ? styles.small : ""}`}>
      <div className={`${styles.bar} ${styles.bar1}`}></div>
      <div className={`${styles.bar} ${styles.bar2}`}></div>
    </div>
  );
};

export default InfiniteLinearProgressBar;
