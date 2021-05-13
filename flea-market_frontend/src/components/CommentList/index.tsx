import { memo } from 'react'
import { Comment, Tooltip, List, Button, Pagination } from 'antd'
import moment from 'moment'
import { isLogin } from '../../common'
import styles from './styles.moudle.less'

const data = [
  {
    // actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: <p>这件商品太好看啦</p>,
    datetime: (
      <Tooltip
        title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    // actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: <p>这件商品我吹爆</p>,
    datetime: (
      <Tooltip
        title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
]

const CommentHeader = () => {
  return (
    <div className={styles.commentHeaderWrap}>
      <span>商品评价</span>
      {!isLogin() ? (
        <Button type='primary'>
          <span className='iconfont'>&#xe7b2;</span>
          登陆后评论
        </Button>
      ) : (
        <Button type='primary'>
          <span className='iconfont'>&#xe7b2;</span>
          发表评论
        </Button>
      )}
    </div>
  )
}

const CommentFooter = () => {
  return (
    <div className={styles.commentFooterWrap}>
      <Pagination defaultCurrent={1} total={50} />
    </div>
  )
}

const CommentList = () => {
  return (
    <List
      className='comment-list'
      header={<CommentHeader />}
      itemLayout='horizontal'
      dataSource={data}
      renderItem={(item) => (
        <li className={styles.listItemWrap}>
          {/* actions={item.actions} */}
          <Comment
            author={item.author}
            avatar={item.avatar}
            content={item.content}
            datetime={item.datetime}
          />
        </li>
      )}
      footer={<CommentFooter />}
    />
  )
}

export default memo(CommentList)
