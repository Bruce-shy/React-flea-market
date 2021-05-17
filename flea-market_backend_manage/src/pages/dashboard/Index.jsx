import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Statistic, Calendar } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import { loadGoods } from '../../store/actions/goods'
import { loadPurchase } from '../../store/actions/purchase'
import { loadUser } from '../../store/actions/user'
function Index(props) {
  const { goods, purchase, user } = props
  useEffect(() => {
    props.dispatch(
      loadUser({
        page: 1,
        per_page: 1000,
        notRemind: true,
      })
    )
    props.dispatch(
      loadGoods({
        page: 1,
        per_page: 1000,
        notRemind: true,
      })
    )
    props.dispatch(
      loadPurchase({
        page: 1,
        per_page: 1000,
        notRemind: true,
      })
    )
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Card title='数据汇总' bordered={false}>
        <Row gutter={8}>
          <Col span={8}>
            <Card title='发布商品数量' color='red'>
              <Statistic
                title='发布商品数量'
                value={goods.goodsList.length}
                prefix={<ArrowUpOutlined />}
              ></Statistic>
            </Card>
          </Col>
          <Col span={8}>
            <Card title='发布求购数量'>
              <Statistic
                title='发布求购数量'
                value={purchase.purchaseList.length}
                prefix={<ArrowUpOutlined />}
              ></Statistic>
            </Card>
          </Col>
          <Col span={8}>
            <Card title='用户数量'>
              <Statistic
                title='用户数量'
                value={user.list.length}
                prefix={<ArrowUpOutlined />}
              ></Statistic>
            </Card>
          </Col>
        </Row>
      </Card>
      <Card title='日历' bordered={false}>
        <div className='site-calendar-demo-card'>
          <Calendar fullscreen={false} />
        </div>
        ,
      </Card>
    </div>
  )
}

export default connect((state) => state)(Index)
