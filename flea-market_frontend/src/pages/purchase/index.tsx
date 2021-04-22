import React from "react";
import { List, Avatar, Space } from "antd";


const listData: any = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://api.youzixy.com/public/uploads/avatar/15784010675050.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

const Purchase = () => {
  return (
    <div className="buy-wrap">
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={listData}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item: any) => (
          <List.Item
            key={item.title}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
      {/* Purchase */}
      {/* <div className="ivu-card-body">
        <div data-v-355cce1e="" className="top-info clearfix">
          <span
            data-v-355cce1e=""
            className="avatar ivu-avatar ivu-avatar-circle ivu-avatar-default ivu-avatar-image"
          >
            <img
              src="https://api.youzixy.com/public/uploads/avatar/15784010675050.png"
              alt=""
            />
          </span>
          <span data-v-355cce1e="" className="username">
            jj
          </span>
          <span data-v-355cce1e="" className="merchant dev-time">
            桂林电子科技大学信息科技学院
          </span>
          <span data-v-355cce1e="" className="dev-time ivu-time">
            更新于2020-01-06{" "}
          </span>
        </div>
        <div data-v-355cce1e="" className="dev-issue-item-title">
          二手手机
        </div>
        <div data-v-355cce1e="" className="content">
          <div data-v-355cce1e="" className="left-info">
            <div data-v-355cce1e="" className="dev-issue-item-summary-content">
              小米,华为,苹果
            </div>
            <div data-v-355cce1e="" className="contact">
              <div data-v-355cce1e="" className="c-item">
                手机：13279289285
              </div>
            </div>
            <div data-v-355cce1e="" className="dev-issue-item-footer">
              <div data-v-355cce1e="" className="dev-issue-item-tags">
                <div
                  data-v-355cce1e=""
                  className="ivu-tag ivu-tag-default ivu-tag-border ivu-tag-checked"
                >
                  <span className="ivu-tag-text ivu-tag-color-default">
                    原装正品
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default Purchase;
