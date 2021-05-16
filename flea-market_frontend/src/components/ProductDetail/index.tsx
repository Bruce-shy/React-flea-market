import { memo } from 'react'
import { Avatar } from 'antd'
import { NavLink } from 'react-router-dom'
import { isLogin } from '../../common'
import styles from './styles.moudle.less'
import { SellerLabel, LabelName } from '../../utils/interface'

const ProductDetail = (props: { goodsInfo: any }) => {
  const { goodsInfo } = props
  const {
    title,
    brief,
    updatedAt = '',
    price,
    originPrice,
    sellerLabel = [],
    publisher = { avatarUrl: '', college: '' },
    weChatNumber,
    phoneNumber,
    qqNumber,
  } = goodsInfo
  const { avatarUrl, college, nickName } = publisher
  return (
    <div className={styles.infoWrap}>
      <div className={styles.topInfo}>
        <Avatar src={avatarUrl} />
        <span className={styles.userName}>{nickName}</span>
      </div>
      <div className={styles.infoTitle}>{title}</div>
      <div className={styles.summarryContent}>{brief}</div>
      <div className={styles.infoItem}>
        <div className={styles.iconWrap}>
          <span className='iconfont'>&#xe7b2;</span>
        </div>
        <div className={styles.price}>
          <span>{price} 元</span>
          <span className={styles.costPrice}>原价 {originPrice} 元</span>
        </div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.iconWrap}>
          <span className='iconfont'>&#xe7b2;</span>
        </div>
        <div className={styles.itemTagWrap}>
          {sellerLabel.map((item: SellerLabel) => (
            <div className={styles.itemTagContent} key={item}>
              <span className={styles.itemTagText}>{LabelName[item]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.iconWrap}>
          <span className='iconfont'>&#xe7b2;</span>
        </div>
        <div>{college}</div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.iconWrap}>
          <span className='iconfont'>&#xe7b2;</span>
        </div>
        <div>{updatedAt.substr(0, 10)}</div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.iconWrap}>
          <span className='iconfont'>&#xe7b2;</span>
        </div>
        <div>
          {isLogin() ? (
            <>
              {weChatNumber && <div>微信号: {weChatNumber}</div>}
              {phoneNumber && <div>手机号: {phoneNumber}</div>}
              {qqNumber && <div>QQ: {qqNumber}</div>}
            </>
          ) : (
            <NavLink to='/login' className={styles.loginText}>
              登陆后查看联系方式
            </NavLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(ProductDetail)
