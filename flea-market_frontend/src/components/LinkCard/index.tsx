import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { isLogin } from '../../common'
import styles from './styles.moudle.less'
import purchaseImgSrc from '../../assets/purchase.png'
import goodsImgSrc from '../../assets/goods.png'

const LinkCard = ({ handleOnCardVisible }: any) => {
  const handleOnMouseEnter = () => handleOnCardVisible(true)

  const handleOnMouseLeave = () =>
    setTimeout(() => handleOnCardVisible(false), 200)

  return (
    <div
      className={styles.linkCardWrap}
      style={{ right: isLogin() ? '215px' : '95px' }}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <NavLink to='/release_goods' className={styles.iconWrap}>
        <div className={styles.imageWrap}>
          <img
            className={styles.imageIcon}
            src={goodsImgSrc}
            alt='发布商品'
          ></img>
        </div>
        <div>发布商品</div>
      </NavLink>
      <NavLink to='/release_buy' className={styles.iconWrap}>
        <div className={styles.imageWrap}>
          <img
            className={styles.imageIcon}
            src={purchaseImgSrc}
            alt='发布求购'
          ></img>
        </div>
        <div>发布求购</div>
      </NavLink>
    </div>
  )
}

export default memo(LinkCard)
