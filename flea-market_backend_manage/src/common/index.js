import { message } from 'antd'

// 文件上传字段值处理
export const normFile = (e) => {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

// 上传图片限制
export const uploadImageLimit = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('你只能上传 jpg 或者 png 格式的文件!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片大小必须小于 2MB!')
  }
  return isJpgOrPng && isLt2M
}

export const isNumber = (str) => {
  const numberReg = /^[0-9]*$/
  if (str && !numberReg.test(str)) {
    message.error('账号必须为纯数字')
    return false
  }
  return true
}

export const isPhoneNumber = (str) => {
  const phoneNumberReg =
    /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
  if (str && !phoneNumberReg.test(str)) {
    message.error('请输入正确的手机号')
    return false
  }
  return true
}
