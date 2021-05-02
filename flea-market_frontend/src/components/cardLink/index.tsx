import { memo } from "react"
import styles from './styles.moudle.less';

const CardLink = () => {
  return (
    <div className={styles.cardLinkWrap}>
      <span className="iconfont">&#xe752;</span>
      <span className="iconfont">&#xe742;</span>
    </div>
  )
}

export default memo(CardLink);
