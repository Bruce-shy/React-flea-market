import { memo } from 'react'
import { Card, Button } from 'antd'
import styles from './styles.moudle.less'

const cardStyle = {
  flex: 1,
  marginBottom: '20px',
}

const DeleteCard = (props: { data: any; onDelete: Function }) => {
  const { data } = props
  const { onDelete } = props
  const { title, _id, account, price, updatedAt } = data
  console.log('deleteCarddata', data)

  const handleOnDelete = () => {
    onDelete(_id, account)
  }

  return (
    <Card
      title={title}
      extra={
        <Button danger onClick={handleOnDelete}>
          删除
        </Button>
      }
      style={cardStyle}
    >
      <div className={styles.contentWrap}>
        <span>￥{price}</span>
        <span>{updatedAt.substr(0, 10)}</span>
      </div>
    </Card>
  )
}

export default memo(DeleteCard)
