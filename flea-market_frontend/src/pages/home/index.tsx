import { Menu, Pagination } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { SubType, NavType } from '../../utils/interface';
import HomeSwiper from '../../components/HomeSwiper';
import DisplayCard from '../../components/DisplayCard';
import styles from "./styles.moudle.less";

const { SubMenu } = Menu;

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
            <DisplayCard />
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
