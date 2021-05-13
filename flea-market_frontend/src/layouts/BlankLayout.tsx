import React from 'react'
import { renderRoutes } from 'react-router-config'

const Layout = ({ route }: any) => (
  <React.Fragment>{renderRoutes(route.routes)}</React.Fragment>
)

export default Layout

// 空白布局
