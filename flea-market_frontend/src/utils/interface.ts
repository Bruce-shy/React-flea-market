import {
  DesktopOutlined,
  FileTextOutlined,
  SkinOutlined,
  TagsOutlined,
  RocketOutlined,
  CustomerServiceOutlined,
  MehOutlined,
  ShakeOutlined,
  NotificationOutlined,
  TagOutlined,
} from '@ant-design/icons'

export enum SellerLabel {
  Genuine = 1, // 原装正品
  NoDisassembly = 2, //无拆无修
  Guaranteed = 3, // 如假包换
  FixedPrice = 4, //一口价
  Negotiable = 5, //价格可谈
  Welcome = 6, //欢迎来撩
}

export const LabelName = {
  [SellerLabel.Genuine]: '原装正品',
  [SellerLabel.NoDisassembly]: '无拆无修',
  [SellerLabel.Guaranteed]: '如假包换',
  [SellerLabel.FixedPrice]: '一口价',
  [SellerLabel.Negotiable]: '价格可谈',
  [SellerLabel.Welcome]: '欢迎来撩',
}

export enum SubType {
  Electronics = 'sub1', // 数码产品
  BooksAndTextbooks = 'sub2', // 书籍教材
  Clothes = 'sub3', // 衣帽鞋伞
  TransportationTools = 'sub4', // 代步工具
  PhysicalFitness = 'sub5', // 体育健身
  HouseholdElectricAppliances = 'sub6', // 家用电器
  DailySupplies = 'sub7', // 日常用品
  VirtualProducts = 'sub8', // 虚拟产品
  MusicalInstruments = 'sub9', // 乐器
  Other = 'sub10', // 其他
}

export enum NavType {
  MobilePhone = '1', // 手机
  Flat = '2', // 平板
  EarPhone = '3', // 耳机
  PortableBattery = '4', // 充电宝
  MobileAccessories = '5', // 手机配件
  ComputerAccessories = '6', // 电脑配件
  WatchBracelet = '7', // 手表手环
  Textbook = '8', // 教科书
  Literature = '9', // 文学
  Novel = '10', // 小说
  Ebook = '11', // 电子书
  EducationExamination = '12', // 教育考试
  Comic = '13', // 动漫
  Skirt = '14', // 裙子
  Trousers = '15', // 裤子
  Clothes = '16', // 衣服
  Hat = '17', // 帽子
  Shoes = '18', // 鞋子
  Box = '19', // 箱子
  Bag = '20', // 包包
  Umbrella = '21', // 雨伞
  Bicycle = '22', // 自行车
  RollerSkates = '23', // 旱冰鞋
  BalanceCar = '24', // 平衡车
  Skate = '25', // 滑板
  ElectricVehicle = '27', // 电动车
  Balls = '28', // 球类
  Racket = '29', // 球拍
  GymShoes = '30', // 运动鞋
  SportsEquipment = '31', // 运动装备
  FitnessEquipment = '32', // 健身器材
  Fan = '33', // 风扇
  Audio = '34', // 音响
  MakeupAndSkinCare = '35', // 化妆护肤
  Gadget = '36', // 小工具
  SchoolSupplies = '37', // 学习用品
  AroundTheGame = '38', // 游戏周边
  RechargeableCard = '39', // 充值卡
  VariousAccount = '40', // 各类账号
  Guitar = '41', // 吉他
  Piano = '42', // 钢琴
  Yukri = '43', // 尤克里里
  ElectronicOrgan = '44', // 电子琴
  Harmonica = '45', // 口琴/竖笛
  PercussionInstruments = '46', // 打击乐器
  Other = '47', // 其他
}

export const CategoryOptions = [
  {
    value: SubType.Electronics,
    icon: DesktopOutlined,
    label: '数码产品',
    children: [
      {
        value: NavType.MobilePhone,
        label: '手机',
      },
      {
        value: NavType.Flat,
        label: '平板',
      },
      {
        value: NavType.EarPhone,
        label: '耳机',
      },
      {
        value: NavType.PortableBattery,
        label: '充电宝',
      },
      {
        value: NavType.MobileAccessories,
        label: '手机配件',
      },
      {
        value: NavType.ComputerAccessories,
        label: '电脑配件',
      },
      {
        value: NavType.WatchBracelet,
        label: '手表手环',
      },
    ],
  },
  {
    value: SubType.BooksAndTextbooks,
    icon: FileTextOutlined,
    label: '书籍教材',
    children: [
      {
        value: NavType.Textbook,
        label: '教科书',
      },
      {
        value: NavType.Literature,
        label: '文学',
      },
      {
        value: NavType.Novel,
        label: '小说',
      },
      {
        value: NavType.Ebook,
        label: '电子书',
      },
      {
        value: NavType.EducationExamination,
        label: '教育考试',
      },
      {
        value: NavType.Comic,
        label: '动漫',
      },
    ],
  },
  {
    value: SubType.Clothes,
    icon: SkinOutlined,
    label: '衣帽鞋伞',
    children: [
      {
        value: NavType.Skirt,
        label: '裙子',
      },
      {
        value: NavType.Trousers,
        label: '裤子',
      },
      {
        value: NavType.Clothes,
        label: '衣服',
      },
      {
        value: NavType.Hat,
        label: '帽子',
      },
      {
        value: NavType.Shoes,
        label: '鞋子',
      },
      {
        value: NavType.Box,
        label: '箱子',
      },
      {
        value: NavType.Bag,
        label: '包包',
      },
      {
        value: NavType.Umbrella,
        label: '雨伞',
      },
    ],
  },
  {
    value: SubType.TransportationTools,
    icon: TagsOutlined,
    label: '代步工具',
    children: [
      {
        value: NavType.Bicycle,
        label: '自行车',
      },
      {
        value: NavType.RollerSkates,
        label: '旱冰鞋',
      },
      {
        value: NavType.BalanceCar,
        label: '平衡车',
      },
      {
        value: NavType.Skate,
        label: '滑板',
      },
      {
        value: NavType.ElectricVehicle,
        label: '电动车',
      },
    ],
  },
  {
    value: SubType.PhysicalFitness,
    icon: RocketOutlined,
    label: '体育健身',
    children: [
      {
        value: NavType.Balls,
        label: '球类',
      },
      {
        value: NavType.Racket,
        label: '球拍',
      },
      {
        value: NavType.GymShoes,
        label: '运动鞋',
      },
      {
        value: NavType.SportsEquipment,
        label: '运动装备',
      },
      {
        value: NavType.FitnessEquipment,
        label: '健身器材',
      },
    ],
  },
  {
    value: SubType.HouseholdElectricAppliances,
    icon: CustomerServiceOutlined,
    label: '家用电器',
    children: [
      {
        value: NavType.Fan,
        label: '风扇',
      },
      {
        value: NavType.Audio,
        label: '音响',
      },
    ],
  },
  {
    value: SubType.DailySupplies,
    icon: MehOutlined,
    label: '日常用品',
    children: [
      {
        value: NavType.MakeupAndSkinCare,
        label: '化妆护肤',
      },
      {
        value: NavType.Gadget,
        label: '小工具',
      },
      {
        value: NavType.SchoolSupplies,
        label: '学习用品',
      },
    ],
  },
  {
    value: SubType.VirtualProducts,
    icon: ShakeOutlined,
    label: '虚拟产品',
    children: [
      {
        value: NavType.AroundTheGame,
        label: '游戏周边',
      },
      {
        value: NavType.RechargeableCard,
        label: '充值卡',
      },
      {
        value: NavType.VariousAccount,
        label: '各类账号',
      },
    ],
  },
  {
    value: SubType.MusicalInstruments,
    icon: NotificationOutlined,
    label: '乐器',
    children: [
      {
        value: NavType.Guitar,
        label: '吉他',
      },
      {
        value: NavType.Piano,
        label: '钢琴',
      },
      {
        value: NavType.Yukri,
        label: '尤克里里',
      },
      {
        value: NavType.ElectronicOrgan,
        label: '电子琴',
      },
      {
        value: NavType.Harmonica,
        label: '口琴/竖笛',
      },
      {
        value: NavType.PercussionInstruments,
        label: '打击乐器',
      },
    ],
  },
  {
    value: SubType.Other,
    icon: TagOutlined,
    label: '其他',
    children: [
      {
        value: NavType.Other,
        label: '其他',
      },
    ],
  },
]
