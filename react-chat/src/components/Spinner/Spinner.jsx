import RefreshIcon from "@mui/icons-material/Refresh";
import styles from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <RefreshIcon />
    </div>
  );
};

export default Spinner;
