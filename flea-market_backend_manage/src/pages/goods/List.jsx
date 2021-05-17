import React, { useEffect } from 'react'
import { Card, Table, Button, Popconfirm, message } from 'antd'
import { connect } from 'react-redux'
import { loadGoods } from '../../store/actions/goods'
import { delOne } from '../../services/goods'

function GoodsList(props) {
  const { goodsList, page } = props

  useEffect(() => {
    props.dispatch(
      loadGoods({
        page: 1,
      })
    )
    // eslint-disable-next-line
  }, [])

  const loadData = () => {
    props.dispatch(
      loadGoods({
        page: page,
        // name: "小米"
      })
    )
  }

  // 组件初始化的时候执行
  const columns = [
    {
      title: '序号',
      key: '_id',
      width: 80,
      align: 'center',
      render: (txt, record, index) => index + 1,
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '主图',
      dataIndex: 'imageUrl',
      render: (txt, record) =>
        record.imageUrl ? (
          <img
            src={record.imageUrl[0]}
            alt={record.title}
            style={{ width: '120px' }}
          />
        ) : (
          '暂无图片'
        ),
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '发布人',
      dataIndex: 'account',
    },
    {
      title: '昵称',
      dataIndex: 'publisher',
      render: (txt, record, index) => record.publisher.nickName,
    },
    {
      title: '微信',
      dataIndex: 'wechatNumber',
    },
    {
      title: '手机',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'qq',
      dataIndex: 'qqNumber',
    },
    {
      title: '操作',
      render: (txt, record, index) => {
        return (
          <div>
            <Button
              type='primary'
              size='small'
              onClick={() => {
                // 跳转到edit页面，传递id作为参数
                props.history.push(`/admin/goods/edit/${record._id}`)
              }}
            >
              修改
            </Button>
            <Popconfirm
              title='确定删除此项？'
              onCancel={() => message.info('用户取消删除')}
              onConfirm={() => {
                // console.log("用户确认删除");
                // 此处调用api接口进行相关操作
                delOne(record._id).then((res) => {
                  loadData()
                })
              }}
            >
              <Button style={{ margin: '0 1rem' }} type='danger' size='small'>
                删除
              </Button>
            </Popconfirm>
          </div>
        )
      },
    },
  ]

  return (
    <Card
      title='商品列表'
      extra={
        <Button
          type='primary'
          size='small'
          onClick={() => props.history.push('/admin/goods/edit')}
        >
          新增
        </Button>
      }
    >
      <Table
        rowKey='_id'
        rowClassName={(record) => (record.onSale ? '' : 'bg-red')}
        pagination={{
          total:50,
          defaultPageSize: 5,
          onChange: (p) => {
            props.dispatch(loadGoods({ page: p }))
          },
        }}
        columns={columns}
        bordered
        dataSource={goodsList}
      />
    </Card>
  )
}

export default connect((state) => state.goods)(GoodsList)
