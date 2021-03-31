import styled from 'styled-components';

// styled 样式 专门解决切页面问题

export const Bottom = styled.div`
    position: fixed;
    z-index: 99;
    background-color: #ffffff;
    bottom: 0;
    height: 1.1730rem;
`;
export const TabBar = styled.div`
    width: 10rem;
    height: 100%;
    display: flex;
    border-top: .000093rem /* 0.01/108 */ solid #d9d9d9;
    a {
        text-decoration: none;
        color:#777777
    }
    & > .selected {
        color: orange
    }
`;

export const TabItem = styled.div`
    flex: 1;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    & > .tab-icon {
        position: absolute;
        bottom: .296296rem /* 32/108 */;
        font-size: .574074rem /* 62/108 */;
    }
    & > .tab-title {
        position: absolute;
        bottom: .046296rem /* 5/108 */;
        font-size: .240741rem /* 26/108 */;
    }
`;
