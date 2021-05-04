import { memo } from "react";
import { Card } from "antd";
import { NavLink } from "react-router-dom";
import styles from "./styles.moudle.less";

const { Meta } = Card;
const cardStyle = {
  width: 220,
};

const DisplayCard = () => {
  return (
    <NavLink to={"/goods_detail?123"}>
      <Card
        hoverable
        style={cardStyle}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="衣品天成短袖" description="刚入手不久 全新" />
        <div className={styles.cardInfo}>
          <span>更新于2020-03-23</span>
          <span>888人浏览</span>
        </div>
        <div className={styles.cardInfo}>
          <span className={styles.cardAmount}>￥49</span>
          <NavLink to={"/goods_detail?123"} activeClassName="selected">
            软件学院
          </NavLink>
        </div>
      </Card>
    </NavLink>
  );
};

export default memo(DisplayCard);
