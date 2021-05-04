import { useState, useEffect, memo } from "react";
import { Image } from "antd";
import styles from "./styles.moudle.less";

const PictureSwitch = () => {
  const [imgList] = useState([1, 2, 3, 4]);
  const [activeImgId, updateActiveImgId] = useState(0);

  useEffect(() => {
    // 初始化将第一个置为蓝色
    document.querySelector("#cardImg0")?.classList.add(styles.active);
  }, []);

  const handleOnClick = (id: any) => {
    // 实现图片跳转效果
    updateActiveImgId(id);
    document
      .querySelector(`#cardImg${activeImgId}`)
      ?.classList.remove(styles.active);
    document.querySelector(`#cardImg${id}`)?.classList.add(styles.active);
  };

  return (
    <div className={styles.thumbWrap}>
      <div className={styles.imgBoxWrap}>
        <Image
          width={350}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </div>
      <div className={styles.imgListWrap}>
        {imgList.map((item, id) => (
          <img
            id={`cardImg${id}`}
            alt=""
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            onClick={() => handleOnClick(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(PictureSwitch);
