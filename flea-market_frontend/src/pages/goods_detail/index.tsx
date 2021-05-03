import { useState } from "react";
import { Image } from "antd";
import styles from "./styles.moudle.less";

const GoodsDetail = () => {
  const [imgList] = useState([1,2,3,4]);
  return (
    <>
      <div className={styles.cardDetailWrap}>
        <div className={styles.thumbWrap}>
          <div className={styles.imgBoxWrap}>
            <Image
              width={350}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </div>
          <div className={styles.imgListWrap}>
          {imgList.map(item => (
            <Image
            width={80}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GoodsDetail;
