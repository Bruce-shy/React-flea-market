import { memo } from 'react'
import { Card } from 'antd'
import { NavLink } from 'react-router-dom'
import styles from './styles.moudle.less'

const { Meta } = Card
const cardStyle = {
  width: 220,
  minHeight: 300,
}

const CardDesc = (props:any) => {
  const { brief } = props
  return (
    <p className={styles.cardDesc}>
        {brief}
    </p>
  )
}

const DisplayCard = (props: { data: any }) => {
  const { data } = props
  return (
    <NavLink to={`/goods_detail?${data._id}`}>
      <Card
        hoverable
        style={cardStyle}
        cover={
          data.imageUrl.length && <img alt={data.title} src={data.imageUrl[0]} />
        }
      >
        <Meta title={data.title} description={<CardDesc brief={data.brief}/>} />
        <div className={styles.cardInfo}>
          <span>更新于{data.updatedAt.substr(0, 10)}</span>
          <span>{data.views ? data.views: 0}人浏览</span>
        </div>
        <div className={styles.cardInfo}>
          <span className={styles.cardAmount}>{data.price}</span>
          <NavLink to={`/goods_detail?${data._id}`} activeClassName='selected'>
            软件学院
          </NavLink>
        </div>
      </Card>
    </NavLink>
  )
}

export default memo(DisplayCard)
