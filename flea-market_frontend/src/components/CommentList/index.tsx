import { useState, memo, useEffect } from 'react'
import { Comment, List, Button, Rate, Pagination } from 'antd'
import { useHistory } from 'react-router-dom'
import { isLogin } from '../../common'
import styles from './styles.moudle.less'

const CommentHeader = (props: any) => {
  const { onClick } = props
  const history = useHistory()

  const handleOnLogin = () => {
    history.push('/login')
  }

  const handleOnClick = () => {
    onClick(true)
  }

  return (
    <div className={styles.commentHeaderWrap}>
      <span>商品评价</span>
      {!isLogin() ? (
        <Button type='primary' onClick={handleOnLogin}>
          <span className='iconfont'>&#xe7b2;</span>
          登陆后评论
        </Button>
      ) : (
        <Button type='primary' onClick={handleOnClick}>
          <span className='iconfont'>&#xe7b2;</span>
          发表评论
        </Button>
      )}
    </div>
  )
}

const CommentFooter = (props: any) => {
  const { commentList } = props
  const { onChangeCommentList, changePage } = props

  const handleOnChange = (page: number) => {
    changePage(page)
    onChangeCommentList(commentList.slice((page - 1) * 5, (page - 1) * 5 + 5))
  }

  return (
    <div className={styles.commentFooterWrap}>
      <Pagination
        defaultCurrent={1}
        total={commentList.length}
        onChange={handleOnChange}
        pageSize={5}
      />
    </div>
  )
}

const CommentList = (props: {
  commentList: any
  onClick: Function
  page: number
  changePage: any
}) => {
  const { commentList, page, changePage, onClick } = props
  const [currentCommentList, updateCommentList] = useState(
    commentList.slice(0, 5)
  )

  useEffect(() => {
    updateCommentList(commentList.slice((page - 1) * 5, (page - 1) * 5 + 5))
  }, [commentList, page])

  return (
    <List
      className='comment-list'
      header={<CommentHeader onClick={onClick} />}
      itemLayout='horizontal'
      dataSource={currentCommentList}
      renderItem={(item: any) => (
        <li className={styles.listItemWrap}>
          <Comment
            author={item?.commentator?.nickName}
            avatar={item?.commentator?.avatarUrl}
            content={item?.content}
            datetime={item?.updatedAt?.substr(0, 10)}
          />
          <Rate allowHalf disabled defaultValue={item?.rate} />
        </li>
      )}
      footer={
        <CommentFooter
          commentList={commentList}
          onChangeCommentList={updateCommentList}
          changePage={changePage}
        />
      }
    />
  )
}

export default memo(CommentList)
