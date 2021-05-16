// createGoodsCommentRequest
import { useState, memo } from 'react'
import { Modal, Input, Rate, message } from 'antd'
import { createGoodsCommentRequest } from '../../services/goods'

const { TextArea } = Input

const ReleaseComment = (props: any) => {
  const { visible, onClick, goodsId, getCommentList } = props

  const [confirmLoading, updateConfirmLoading] = useState(false)
  const [rate, updateRate] = useState(2.5)
  const [content, updateContent] = useState('')

  // 发表评论
  const handleOnOk = () => {
    if (content === '') {
      message.error('请输入评论!')
    } else {
      updateConfirmLoading(true)
      createGoodsCommentRequest(goodsId, { rate, content }).then((res: any) => {
        if (res.success) {
          getCommentList(rate, content)
          message.success(res.message)
          updateConfirmLoading(false)
          onClick(false)
        }
      })
      .catch((err) => {
        message.error(err.message)
      })
    }
  }

  const handleOnCancel = () => {
    onClick(false)
  }

  // 受控组件
  const handleOnChange = (e: any) => {
    updateContent(e.target.value)
  }
  return (
    <Modal
      title='发表评论'
      visible={visible}
      onOk={handleOnOk}
      confirmLoading={confirmLoading}
      onCancel={handleOnCancel}
    >
      <Rate
        allowHalf
        defaultValue={rate}
        style={{ marginBottom: '15px' }}
        onChange={updateRate}
      />
      <TextArea
        placeholder='输入评论内容...'
        allowClear
        value={content}
        onChange={handleOnChange}
      />
    </Modal>
  )
}

export default memo(ReleaseComment)
