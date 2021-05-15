import { memo } from 'react'
import { Menu } from 'antd'
import { CategoryOptions } from '../../utils/interface'
import HomeSwiper from '../HomeSwiper'
import styles from './styles.moudle.less'

const { SubMenu } = Menu

const NavCard = ({ handleOnCardVisible }: any) => {
  const handleClick = (e: any) => {
    console.log('click', e)
  }
  return (
    <>
      <Menu onClick={handleClick} style={{ width: 256 }} mode='vertical'>
        {CategoryOptions.map((item: any) => {
          return (
            <SubMenu
              key={item.value}
              icon={<item.icon />}
              title={item.label}
            >
              {item.children.map((item :any) => {
                return (
                  <Menu.Item key={item.value}>{item.label}</Menu.Item>
                )
              })}
            </SubMenu>
          )
        })}
      </Menu>
      <div className={styles.swiperWrap}>
        <HomeSwiper />
      </div>
    </>
  )
}

export default memo(NavCard)
