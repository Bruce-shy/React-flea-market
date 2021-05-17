import React, { useEffect } from 'react'
import { Card, Table, Button, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { loadUser } from '../../store/actions/user'
import { delOne } from '../../services/user'
import './User.css'

function User(props) {
  console.log(props)

  const { list, page } = props

  useEffect(() => {
    props.dispatch(
      loadUser({
        page: 1,
      })
    )
    // eslint-disable-next-line
  }, [])

  const loadData = () => {
    props.dispatch(
      loadUser({
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
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      render: (txt, record) =>
        // "暂无图片",
        record.avatarUrl ? (
          <img
            src={record.avatarUrl}
            alt={record.name}
            style={{ width: '120px' }}
          />
        ) : (
          '暂无图片'
        ),
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '微信',
      dataIndex: 'weChatNumber',
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
                props.history.push(`/admin/user/edit/${record.account}`)
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
      title='用户列表'
      extra={
        <Button
          type='primary'
          size='small'
          onClick={() => props.history.push('/admin/user/edit')}
        >
          新增
        </Button>
      }
    >
      <Table
        rowKey='_id'
        rowClassName={(record) => (record.onSale ? '' : 'bg-red')}
        pagination={{
          total: 30,
          defaultPageSize: 20,
          onChange: (p) => {
            props.dispatch(loadUser({ page: p }))
          },
        }}
        columns={columns}
        bordered
        dataSource={list}
      />
    </Card>
  )
}

export default connect((state) => state.user)(User)
