import { useState, useEffect, memo } from 'react'
import { Image } from 'antd'
import styles from './styles.moudle.less'

const PictureSwitch = (props: { imageList: Array<string> }) => {
  const { imageList } = props
  const [activeImgId, updateActiveImgId] = useState(0)

  useEffect(() => {
    // 初始化将第一个置为蓝色
    document.querySelector('#cardImg0')?.classList.add(styles.active)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnClick = (id: any) => {
    // 实现图片切换效果
    updateActiveImgId(id)
    document
      .querySelector(`#cardImg${activeImgId}`)
      ?.classList.remove(styles.active)
    document.querySelector(`#cardImg${id}`)?.classList.add(styles.active)
  }

  return (
    <div className={styles.thumbWrap}>
      <div className={styles.imgBoxWrap}>
        <Image width={350} src={imageList[activeImgId]} />
      </div>
      <div className={styles.imgListWrap}>
        {imageList.map((item, id) => (
          <img
            id={`cardImg${id}`}
            key={item}
            alt='商品详情'
            src={item}
            onClick={() => handleOnClick(id)}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(PictureSwitch)
