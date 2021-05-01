import styled from "styled-components";

// styled 样式 专门解决切页面问题

export const Header = styled.div`
  position: fixed;
  display: flex;
  z-index: 9;
  top: 0;
  height: 64px;
  width: 100%;
  padding-left: 32px;
  padding-right: 32px;
  box-shadow: 0 4px 8px 0 rgb(7 17 27 / 10%);
  background-color: rgb(255, 255, 255) !important;
`;

export const TabBarLeft = styled.div`
  flex: 2;
  height: 100%;
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
    color: #777777;
  }
  & > .selected {
    color: #2d8cf0;
  }
`;

export const TabBarRight = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  a {
    text-decoration: none;
    color: #777777;
  }
  & > .selected {
    color: #2d8cf0;
  }
`;

export const TabItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100px;
  height: 45px;
  text-align: center;
  & > .tabItem-image {
    width: 120px;
    height: 45px;
  }
  & > .tabItem-hover:hover {
      color: #2d8cf0;
  }
`;

export const TabText = styled.span`
  font-size: 16px;
`;
