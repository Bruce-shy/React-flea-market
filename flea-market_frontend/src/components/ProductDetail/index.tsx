import { memo } from "react";
import { Avatar } from "antd";
import { NavLink } from "react-router-dom";
import styles from "./styles.moudle.less";

const ProductDetail = () => {
  return (
    <div className={styles.infoWrap}>
      <div className={styles.topInfo}>
        <Avatar src="https://api.youzixy.com/public/uploads/avatar/5e167620008b8.jpg" />
        <span className={styles.userName}>17688736121</span>
      </div>
      <div className={styles.infoTitle}>卡西欧G-shock.T400系列，最高版本</div>
      <div className={styles.summarryContent}>
        卡西欧G-shock.T400系列，最高版本，主要功能：指南针功能，温度计，45度自动抬手灯，防震防水，世界时间，倒计时，闹铃，间歇响报，1:1打造做工精致，日历.尺寸：50mm大号
      </div>
      <div className={styles.infoItem}>
        <div className={styles.iconWrap}>
          <span className="iconfont">&#xe7b2;</span>
        </div>
        <div className={styles.price}>
          <span>238元</span>
          <span className={styles.costPrice}>原价1580元</span>
        </div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.iconWrap}>
          <span className="iconfont">&#xe7b2;</span>
        </div>
        <div className={styles.itemTagWrap}>
          <div className={styles.itemTagContent}>
            <span className={styles.itemTagText}>一口价</span>
          </div>
          <div className={styles.itemTagContent}>
            <span className={styles.itemTagText}>欢迎来撩</span>
          </div>
          <div className={styles.itemTagContent}>
            <span className={styles.itemTagText}>非诚勿扰</span>
          </div>
        </div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.iconWrap}>
          <span className="iconfont">&#xe7b2;</span>
        </div>
        <div>成都理工大学工程技术学院</div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.iconWrap}>
          <span className="iconfont">&#xe7b2;</span>
        </div>
        <div>2020-01-09</div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.iconWrap}>
          <span className="iconfont">&#xe7b2;</span>
        </div>
        <div>
          <NavLink to="/login" className={styles.loginText}>
            登陆后查看联系方式
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductDetail);
