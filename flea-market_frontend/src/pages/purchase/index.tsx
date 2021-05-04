import { List, Avatar } from "antd";
import moment from "moment";
import styles from "./styles.moudle.less";

const listData: any = [];
for (let i = 0; i < 40; i++) {
  listData.push({
    account: `201720180311`,
    nickName: `迪迦奥特曼${i}号`,
    college: `软件学院`,
    releaseTime: `${new Date()}`,
    avatar: "https://api.youzixy.com/public/uploads/avatar/15784010675050.png",
    title: "二手女朋友",
    content: "御姐,萝莉,女王",
    imageSrc:
      "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
    contactMode: [
      { name: "qq", content: "12347312984" },
      { name: "手机", content: "12347312984" },
    ],
    tagList: [{ name: "价格可谈" }],
  });
}

const ListHeader = ({ item }: any) => {
  return (
    <div className={styles.listHeader}>
      <span className={styles.listItemName}>{item.nickName}</span>
      <span className={styles.listItem}>{item.college}</span>
      <span className={styles.listItem}>{item.account}</span>
      <span className={styles.listItem}>
        更新于{moment(item.releaseTime).format("LLLL")}
      </span>
    </div>
  );
};

const ListIcon = ({ tagName }: any) => {
  return (
    <div className={styles.listIcon}>
      <span className={styles.listIconFont}>{tagName}</span>
    </div>
  );
};

const Purchase = () => {
  return (
    <div className={styles.purchaseWrap}>
      <List
        className={styles.listWrap}
        itemLayout="vertical"
        size="small"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 4,
        }}
        bordered={true}
        dataSource={listData}
        // loading={true} // 数据请求
        renderItem={(item: any) => (
          <List.Item
            key={item.nickName}
            extra={<img width={272} alt="logo" src={item.imageSrc} />}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<ListHeader item={item} />}
            />
            <div className={styles.listTitle}>{item.title}</div>
            <div className={styles.listContent}>{item.content}</div>
            {item.contactMode.map((item: any) => (
              <span className={styles.listContactMode}>
                {item.name}: {item.content}
              </span>
            ))}
            {item.tagList.map((item: any) => (
              <ListIcon tagName={item.name} />
            ))}
          </List.Item>
        )}
      />
    </div>
  );
};
export default Purchase;
