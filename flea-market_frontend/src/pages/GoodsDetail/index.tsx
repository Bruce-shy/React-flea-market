import PictureSwitch from "../../components/PictureSwitch";
import ProductDetail from "../../components/ProductDetail";
import CommentList from "../../components/CommentList";
import styles from "./styles.moudle.less";

const GoodsDetail = () => {
  return (
    <>
      <div className={styles.cardDetailWrap}>
        <PictureSwitch />
        <ProductDetail />
      </div>
      <div className={styles.commentListWrap}>
        <CommentList />
      </div>
    </>
  );
};

export default GoodsDetail;
