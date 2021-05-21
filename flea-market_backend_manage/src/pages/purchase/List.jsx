import React, { useEffect } from 'react'
import { Card, Table, Button, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { loadPurchase } from '../../store/actions/purchase'
import { delOne } from '../../services/purchase'

function PurchaseList(props) {
  const { purchaseList, page } = props

  useEffect(() => {
    props.dispatch(
      loadPurchase({
        page: 1,
      })
    )
    // eslint-disable-next-line
  }, [])

  const loadData = () => {
    props.dispatch(
      loadPurchase({
        page: page,
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
                props.history.push(`/admin/purchase/edit/${record._id}`)
              }}
            >
              修改
            </Button>
            <Popconfirm
              title='确定删除此项？'
              onCancel={() => console.log('用户取消删除')}
              onConfirm={() => {
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
      title='求购列表'
      extra={
        <Button
          type='primary'
          size='small'
          onClick={() => props.history.push('/admin/purchase/edit')}
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
            props.dispatch(loadPurchase({ page: p }))
          },
        }}
        columns={columns}
        bordered
        dataSource={purchaseList}
      />
    </Card>
  )
}

export default connect((state) => state.purchase)(PurchaseList)
