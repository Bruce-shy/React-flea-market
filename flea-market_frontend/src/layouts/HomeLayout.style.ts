import styled from 'styled-components';

// styled 样式 专门解决切页面问题

export const Top = styled.div`
    position: fixed;
    z-index: 99;
    top: 0;
    height: 64px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    z-index: 900;
    box-shadow: 0 4px 8px 0 rgb(7 17 27 / 10%);
    background-color: rgb(255, 255, 255) !important;
`;
export const TabBar = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    a {
        text-decoration: none;
        color:#777777
    }
    & > .selected {
        color: blue
    }
`;

export const TabItem = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    width: 120px;
    height: 45px;
    /* background-color:red; */
    text-align: center;
    & > .tab-img{
        width:120px;
        height:45px;
    }
    & > .tab-title {
        font-size: 16px;
        /* background-color:red; */
    }
`;
