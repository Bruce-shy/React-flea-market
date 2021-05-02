import { Menu, Card, Pagination } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import HomeSwiper from '../../components/homeSwiper';
import styles from "./styles.moudle.less";

const { SubMenu } = Menu;
const { Meta } = Card;
const cardStyle = {
  width: 220,
};

enum SubType {
  Electronics = "sub1", // 数码产品
  BooksAndTextbooks = "sub2", // 书籍教材
  Clothes = "sub3", // 衣帽鞋伞
  TransportationTools = "sub4", // 代步工具
  PhysicalFitness = "sub5", // 体育健身
  HouseholdElectricAppliances = "sub6", // 家用电器
  DailySupplies = "sub7", // 日常用品
  VirtualProducts = "sub8", // 虚拟产品
  MusicalInstruments = "sub9", // 乐器
  Other = "sub10", // 其他
}

enum NavType {
  MobilePhone = "1", // 手机
  Flat = "2", // 平板
  EarPhone = "3", // 耳机
  PortableBattery = "4", // 充电宝
  MobileAccessories = "5", // 手机配件
  ComputerAccessories = "6", // 电脑配件
  WatchBracelet = "7", // 手表手环
  Textbook = "8", // 教科书
  Literature = "9", // 文学
  Novel = "10", // 小说
  Ebook = "11", // 电子书
  EducationExamination = "12", // 教育考试
  Comic = "13", // 动漫
  Skirt = "14", // 裙子
  Trousers = "15", // 裤子
  Clothes = "16", // 衣服
  Hat = "17", // 帽子
  Shoes = "18", // 鞋子
  Box = "19", // 箱子
  Bag = "20", // 包包
  Umbrella = "21", // 雨伞
  Bicycle = "22", // 自行车
  RollerSkates = "23", // 旱冰鞋
  BalanceCar = "24", // 平衡车
  Skate = "25", // 滑板
  ElectricVehicle = "27", // 电动车
  Balls = "28", // 球类
  Racket = "29", // 球拍
  GymShoes = "30", // 运动鞋
  SportsEquipment = "31", // 运动装备
  FitnessEquipment = "32", // 健身器材
  Fan = "33", // 风扇
  Audio = "34", // 音响
  MakeupAndSkinCare = "35", // 化妆护肤
  Gadget = "36", // 小工具
  SchoolSupplies = "37", // 学习用品
  AroundTheGame = "38", // 游戏周边
  RechargeableCard = "39", // 充值卡
  VariousAccount = "40", // 各类账号
  Guitar = "41", // 吉他
  Piano = "42", // 钢琴
  Yukri = "43", // 尤克里里
  ElectronicOrgan = "44", // 电子琴
  Harmonica = "45", // 口琴/竖笛
  PercussionInstruments = "46", // 打击乐器
  Other = "47", // 其他
}

const Home = () => {
  const cardList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  function handleClick(e: any) {
    console.log("click", e);
  }
  function onChange(pageNumber: any) {
    console.log("Page: ", pageNumber);
  }
  return (
    <>
      <div className={styles.navWrap}>
        <Menu onClick={handleClick} style={{ width: 256 }} mode="vertical">
          <SubMenu
            key={SubType.Electronics}
            icon={<MailOutlined />}
            title="数码产品"
          >
            <Menu.Item key={NavType.MobilePhone}>手机</Menu.Item>
            <Menu.Item key={NavType.Flat}>平板</Menu.Item>
            <Menu.Item key={NavType.EarPhone}>耳机</Menu.Item>
            <Menu.Item key={NavType.PortableBattery}>充电宝</Menu.Item>
            <Menu.Item key={NavType.MobileAccessories}>手机配件</Menu.Item>
            <Menu.Item key={NavType.ComputerAccessories}>电脑配件</Menu.Item>
            <Menu.Item key={NavType.WatchBracelet}>手表手环</Menu.Item>
          </SubMenu>
          <SubMenu
            key={SubType.BooksAndTextbooks}
            icon={<AppstoreOutlined />}
            title="书籍教材"
          >
            <Menu.Item key={NavType.Textbook}>教科书</Menu.Item>
            <Menu.Item key={NavType.Literature}>文学</Menu.Item>
            <Menu.Item key={NavType.Novel}>小说</Menu.Item>
            <Menu.Item key={NavType.Ebook}>电子书</Menu.Item>
            <Menu.Item key={NavType.EducationExamination}>教育考试</Menu.Item>
            <Menu.Item key={NavType.Comic}>动漫</Menu.Item>
          </SubMenu>
          <SubMenu
            key={SubType.Clothes}
            icon={<SettingOutlined />}
            title="衣帽鞋伞"
          >
            <Menu.Item key={NavType.Skirt}>裙子</Menu.Item>
            <Menu.Item key={NavType.Trousers}>裤子</Menu.Item>
            <Menu.Item key={NavType.Clothes}>衣服</Menu.Item>
            <Menu.Item key={NavType.Hat}>帽子</Menu.Item>
            <Menu.Item key={NavType.Shoes}>鞋子</Menu.Item>
            <Menu.Item key={NavType.Box}>箱子</Menu.Item>
            <Menu.Item key={NavType.Bag}>包包</Menu.Item>
            <Menu.Item key={NavType.Umbrella}>雨伞</Menu.Item>
          </SubMenu>
          <SubMenu
            key={SubType.TransportationTools}
            icon={<SettingOutlined />}
            title="代步工具"
          >
            <Menu.Item key={NavType.Bicycle}>自行车</Menu.Item>
            <Menu.Item key={NavType.RollerSkates}>旱冰鞋</Menu.Item>
            <Menu.Item key={NavType.BalanceCar}>平衡车</Menu.Item>
            <Menu.Item key={NavType.Skate}>滑板</Menu.Item>
            <Menu.Item key={NavType.ElectricVehicle}>电动车</Menu.Item>
          </SubMenu>
          <SubMenu
            key={SubType.PhysicalFitness}
            icon={<SettingOutlined />}
            title="体育健身"
          >
            <Menu.Item key={NavType.Balls}>球类</Menu.Item>
            <Menu.Item key={NavType.Racket}>球拍</Menu.Item>
            <Menu.Item key={NavType.GymShoes}>运动鞋</Menu.Item>
            <Menu.Item key={NavType.SportsEquipment}>运动装备</Menu.Item>
            <Menu.Item key={NavType.FitnessEquipment}>健身器材</Menu.Item>
          </SubMenu>
          <SubMenu
            key={SubType.HouseholdElectricAppliances}
            icon={<SettingOutlined />}
            title="家用电器"
          >
            <Menu.Item key={NavType.Fan}>风扇</Menu.Item>
            <Menu.Item key={NavType.Audio}>音响</Menu.Item>
          </SubMenu>
          <SubMenu
            key={SubType.DailySupplies}
            icon={<SettingOutlined />}
            title="日常用品"
          >
            <Menu.Item key={NavType.MakeupAndSkinCare}>化妆护肤</Menu.Item>
            <Menu.Item key={NavType.Gadget}>小工具</Menu.Item>
            <Menu.Item key={NavType.SchoolSupplies}>学习用品</Menu.Item>
          </SubMenu>
          <SubMenu
            key={SubType.VirtualProducts}
            icon={<SettingOutlined />}
            title="虚拟产品"
          >
            <Menu.Item key={NavType.AroundTheGame}>游戏周边</Menu.Item>
            <Menu.Item key={NavType.RechargeableCard}>充值卡</Menu.Item>
            <Menu.Item key={NavType.VariousAccount}>各类账号</Menu.Item>
          </SubMenu>
          <SubMenu
            key={SubType.MusicalInstruments}
            icon={<SettingOutlined />}
            title="乐器"
          >
            <Menu.Item key={NavType.Guitar}>吉他</Menu.Item>
            <Menu.Item key={NavType.Piano}>钢琴</Menu.Item>
            <Menu.Item key={NavType.Yukri}>尤克里里</Menu.Item>
            <Menu.Item key={NavType.ElectronicOrgan}>电子琴</Menu.Item>
            <Menu.Item key={NavType.Harmonica}>口琴/竖笛</Menu.Item>
            <Menu.Item key={NavType.PercussionInstruments}>打击乐器</Menu.Item>
          </SubMenu>
          <SubMenu key={SubType.Other} icon={<SettingOutlined />} title="其他">
            <Menu.Item key={NavType.Other}>其他</Menu.Item>
          </SubMenu>
        </Menu>
        <div className={styles.swiperWrap}>
          <HomeSwiper />
        </div>
      </div>
      <div className={styles.listWrap}>
        {cardList.map((m) => (
          <div className={styles.cardWrap}>
            <Card
              hoverable
              style={cardStyle}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta title="衣品天成短袖" description="刚入手不久 全新" />
              <div className={styles.cardInfo}>
                <span>更新于2020-03-23</span>
                <span>888人浏览</span>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardAmount}>￥49</span>
                <NavLink to={"/goods_detail?123"} activeClassName="selected">
                  软件学院
                </NavLink>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className={styles.paginationWrap}>
        <Pagination
          showQuickJumper
          defaultCurrent={2}
          total={500}
          onChange={onChange}
        />
      </div>
      <div className={styles.footerWrap}></div>
    </>
  );
};
export default Home;
