import { 
  Ruler, 
  Weight, 
  Square, 
  FlaskConical, 
  Thermometer, 
  Gauge, 
  Clock, 
  HardDrive, 
  BarChart2, 
  Zap, 
  Power, 
  Compass, 
  Radio, 
  Fuel 
} from "lucide-react"

export type Category = {
  id: string
  name: string
  description: string
  icon: any
  color: string
  seoKeywords: string[]
  popularUnits: Array<{from: string, to: string}>
}

export const CATEGORIES: Category[] = [
  {
    id: "length",
    name: "长度单位换算",
    description: "在线米、厘米、英寸、英尺等长度单位之间的换算工具",
    icon: Ruler,
    color: "bg-blue-500",
    seoKeywords: ["长度换算", "长度单位换算", "长度转换器", "米转厘米", "厘米转英寸"],
    popularUnits: [
      {from: "meters", to: "centimeters"},
      {from: "inches", to: "centimeters"},
      {from: "feet", to: "meters"},
      {from: "kilometers", to: "miles"}
    ]
  },
  {
    id: "weight",
    name: "重量单位换算",
    description: "在线千克、克、磅、盎司等质量单位之间的换算工具",
    icon: Weight,
    color: "bg-red-500",
    seoKeywords: ["重量换算", "质量换算", "重量转换器", "千克转磅", "克转盎司"],
    popularUnits: [
      {from: "kilograms", to: "pounds"},
      {from: "grams", to: "ounces"},
      {from: "kilograms", to: "grams"},
      {from: "jin", to: "kilograms"}
    ]
  },
  {
    id: "area",
    name: "面积单位换算",
    description: "在线平方米、平方英尺、公顷、亩等面积单位之间的换算工具",
    icon: Square,
    color: "bg-green-500",
    seoKeywords: ["面积换算", "面积单位换算", "面积转换器", "平方米转平方英尺", "公顷转亩"],
    popularUnits: [
      {from: "square_meters", to: "square_feet"},
      {from: "hectares", to: "square_meters"},
      {from: "acres", to: "hectares"},
      {from: "mu", to: "square_meters"}
    ]
  },
  {
    id: "volume",
    name: "体积单位换算",
    description: "在线立方米、升、加仑、毫升等体积单位之间的换算工具",
    icon: FlaskConical,
    color: "bg-purple-500",
    seoKeywords: ["体积换算", "容积换算", "体积转换器", "升转毫升", "加仑转升"],
    popularUnits: [
      {from: "liters", to: "milliliters"},
      {from: "gallons", to: "liters"},
      {from: "cubic_meters", to: "cubic_feet"},
      {from: "fluid_ounces", to: "milliliters"}
    ]
  },
  {
    id: "temperature",
    name: "温度单位换算",
    description: "在线摄氏度、华氏度、开尔文等温度单位之间的换算工具",
    icon: Thermometer,
    color: "bg-orange-500",
    seoKeywords: ["温度换算", "温度单位换算", "温度转换器", "摄氏度转华氏度", "开尔文转摄氏度"],
    popularUnits: [
      {from: "celsius", to: "fahrenheit"},
      {from: "fahrenheit", to: "celsius"},
      {from: "celsius", to: "kelvin"},
      {from: "kelvin", to: "celsius"}
    ]
  },
  {
    id: "speed",
    name: "速度单位换算",
    description: "在线米/秒、公里/小时、英里/小时等速度单位之间的换算工具",
    icon: Gauge,
    color: "bg-amber-500",
    seoKeywords: ["速度换算", "速度单位换算", "速度转换器", "米/秒转公里/小时", "英里/小时转公里/小时"],
    popularUnits: [
      {from: "meters_per_second", to: "kilometers_per_hour"},
      {from: "kilometers_per_hour", to: "miles_per_hour"},
      {from: "knots", to: "kilometers_per_hour"},
      {from: "miles_per_hour", to: "meters_per_second"}
    ]
  },
  {
    id: "time",
    name: "时间单位换算",
    description: "在线秒、分钟、小时、天等时间单位之间的换算工具",
    icon: Clock,
    color: "bg-teal-500",
    seoKeywords: ["时间换算", "时间单位换算", "时间转换器", "秒转分钟", "小时转天"],
    popularUnits: [
      {from: "seconds", to: "minutes"},
      {from: "minutes", to: "hours"},
      {from: "days", to: "hours"},
      {from: "weeks", to: "days"}
    ]
  },
  {
    id: "data",
    name: "数据存储单位换算",
    description: "在线比特、字节、KB、MB、GB等数据存储单位之间的换算工具",
    icon: HardDrive,
    color: "bg-sky-500",
    seoKeywords: ["数据存储换算", "存储单位换算", "存储转换器", "KB转MB", "GB转TB"],
    popularUnits: [
      {from: "kilobytes", to: "megabytes"},
      {from: "megabytes", to: "gigabytes"},
      {from: "gigabytes", to: "terabytes"},
      {from: "bits", to: "bytes"}
    ]
  },
  {
    id: "pressure",
    name: "压力单位换算",
    description: "在线帕斯卡、巴、标准大气压、磅/平方英寸等压力单位之间的换算工具",
    icon: BarChart2,
    color: "bg-indigo-500",
    seoKeywords: ["压力换算", "压力单位换算", "压力转换器", "帕斯卡转千帕", "巴转毫巴"],
    popularUnits: [
      {from: "pascals", to: "kilopascals"},
      {from: "bars", to: "pascals"},
      {from: "atmospheres", to: "pascals"},
      {from: "psi", to: "pascals"}
    ]
  },
  {
    id: "energy",
    name: "能量单位换算",
    description: "在线焦耳、卡路里、千卡、千瓦时等能量单位之间的换算工具",
    icon: Zap,
    color: "bg-yellow-500",
    seoKeywords: ["能量换算", "功单位换算", "能量转换器", "焦耳转千焦", "卡路里转千焦"],
    popularUnits: [
      {from: "joules", to: "kilojoules"},
      {from: "calories", to: "joules"},
      {from: "kilocalories", to: "joules"},
      {from: "kilowatt_hours", to: "joules"}
    ]
  },
  {
    id: "power",
    name: "功率单位换算",
    description: "在线瓦特、千瓦、马力等功率单位之间的换算工具",
    icon: Power,
    color: "bg-pink-500",
    seoKeywords: ["功率换算", "功率单位换算", "功率转换器", "瓦特转千瓦", "马力换算"],
    popularUnits: [
      {from: "watts", to: "kilowatts"},
      {from: "horsepower", to: "watts"},
      {from: "kilowatts", to: "horsepower"},
      {from: "watts", to: "btu_per_hour"}
    ]
  },
  {
    id: "angle",
    name: "角度单位换算",
    description: "在线度、弧度、梯度等角度单位之间的换算工具",
    icon: Compass,
    color: "bg-rose-500",
    seoKeywords: ["角度换算", "角度单位换算", "角度转换器", "度转弧度", "弧度转度"],
    popularUnits: [
      {from: "degrees", to: "radians"},
      {from: "radians", to: "degrees"},
      {from: "degrees", to: "gradians"},
      {from: "gradians", to: "degrees"}
    ]
  },
  {
    id: "frequency",
    name: "频率单位换算",
    description: "在线赫兹、千赫、兆赫等频率单位之间的换算工具",
    icon: Radio,
    color: "bg-emerald-500",
    seoKeywords: ["频率换算", "频率单位换算", "频率转换器", "赫兹转千赫", "千赫转兆赫"],
    popularUnits: [
      {from: "hertz", to: "kilohertz"},
      {from: "kilohertz", to: "megahertz"},
      {from: "megahertz", to: "gigahertz"},
      {from: "hertz", to: "cycles_per_minute"}
    ]
  },
  {
    id: "fuel",
    name: "燃油效率单位换算",
    description: "在线升/百公里、英里/加仑、公里/升等燃油效率单位之间的换算工具",
    icon: Fuel,
    color: "bg-cyan-500",
    seoKeywords: ["油耗换算", "燃油效率转换器", "升/百公里转英里/加仑", "英里/加仑转升/百公里"],
    popularUnits: [
      {from: "liters_per_100km", to: "miles_per_gallon"},
      {from: "miles_per_gallon", to: "liters_per_100km"},
      {from: "kilometers_per_liter", to: "miles_per_gallon"},
      {from: "miles_per_gallon", to: "kilometers_per_liter"}
    ]
  }
]

export type UnitData = {
  id: string
  name: string
  conversion: number | ((value: number) => number)
  reverseConversion: number | ((value: number) => number)
  categoryId: string
  symbol: string
}

export const UNIT_SYSTEMS: Record<string, Record<string, UnitData>> = {
  length: {
    meters: {
      id: "meters",
      name: "米",
      conversion: 1,
      reverseConversion: 1,
      categoryId: "length", 
      symbol: "m"
    },
    centimeters: {
      id: "centimeters",
      name: "厘米",
      conversion: 0.01,
      reverseConversion: 100,
      categoryId: "length",
      symbol: "cm"
    },
    kilometers: {
      id: "kilometers",
      name: "千米",
      conversion: 1000,
      reverseConversion: 0.001,
      categoryId: "length",
      symbol: "km"
    },
    millimeters: {
      id: "millimeters",
      name: "毫米",
      conversion: 0.001,
      reverseConversion: 1000,
      categoryId: "length",
      symbol: "mm"
    },
    inches: {
      id: "inches",
      name: "英寸",
      conversion: 0.0254,
      reverseConversion: 39.3701,
      categoryId: "length",
      symbol: "in"
    },
    feet: {
      id: "feet",
      name: "英尺",
      conversion: 0.3048,
      reverseConversion: 3.28084,
      categoryId: "length",
      symbol: "ft"
    },
    yards: {
      id: "yards",
      name: "码",
      conversion: 0.9144,
      reverseConversion: 1.09361,
      categoryId: "length",
      symbol: "yd"
    },
    miles: {
      id: "miles",
      name: "英里",
      conversion: 1609.34,
      reverseConversion: 0.000621371,
      categoryId: "length",
      symbol: "mi"
    },
    nautical_miles: {
      id: "nautical_miles",
      name: "海里",
      conversion: 1852,
      reverseConversion: 0.000539957,
      categoryId: "length",
      symbol: "nmi"
    },
    chinese_cun: {
      id: "chinese_cun",
      name: "市寸",
      conversion: 0.0333333,
      reverseConversion: 30,
      categoryId: "length",
      symbol: "寸"
    },
    chinese_chi: {
      id: "chinese_chi",
      name: "市尺",
      conversion: 0.333333,
      reverseConversion: 3,
      categoryId: "length",
      symbol: "尺"
    }
  },
  weight: {
    kilograms: {
      id: "kilograms",
      name: "千克",
      conversion: 1,
      reverseConversion: 1,
      categoryId: "weight",
      symbol: "kg"
    },
    grams: {
      id: "grams",
      name: "克",
      conversion: 0.001,
      reverseConversion: 1000,
      categoryId: "weight",
      symbol: "g"
    },
    milligrams: {
      id: "milligrams",
      name: "毫克",
      conversion: 0.000001,
      reverseConversion: 1000000,
      categoryId: "weight",
      symbol: "mg"
    },
    metric_tons: {
      id: "metric_tons",
      name: "吨",
      conversion: 1000,
      reverseConversion: 0.001,
      categoryId: "weight",
      symbol: "t"
    },
    pounds: {
      id: "pounds",
      name: "磅",
      conversion: 0.453592,
      reverseConversion: 2.20462,
      categoryId: "weight",
      symbol: "lb"
    },
    ounces: {
      id: "ounces",
      name: "盎司",
      conversion: 0.0283495,
      reverseConversion: 35.274,
      categoryId: "weight",
      symbol: "oz"
    },
    jin: {
      id: "jin",
      name: "市斤",
      conversion: 0.5,
      reverseConversion: 2,
      categoryId: "weight",
      symbol: "斤"
    }
  },
  temperature: {
    celsius: {
      id: "celsius",
      name: "摄氏度",
      conversion: (c: number) => c,
      reverseConversion: (c: number) => c,
      categoryId: "temperature",
      symbol: "°C"
    },
    fahrenheit: {
      id: "fahrenheit",
      name: "华氏度",
      conversion: (f: number) => (f - 32) * 5/9,
      reverseConversion: (c: number) => c * 9/5 + 32,
      categoryId: "temperature",
      symbol: "°F"
    },
    kelvin: {
      id: "kelvin",
      name: "开尔文",
      conversion: (k: number) => k - 273.15,
      reverseConversion: (c: number) => c + 273.15,
      categoryId: "temperature",
      symbol: "K"
    }
  }
} 