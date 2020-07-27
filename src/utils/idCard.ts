const citys = {
  11: "北京",
  12: "天津",
  13: "河北",
  14: "山西",
  15: "内蒙古",
  21: "辽宁",
  22: "吉林",
  23: "黑龙江 ",
  31: "上海",
  32: "江苏",
  33: "浙江",
  34: "安徽",
  35: "福建",
  36: "江西",
  37: "山东",
  41: "河南",
  42: "湖北 ",
  43: "湖南",
  44: "广东",
  45: "广西",
  46: "海南",
  50: "重庆",
  51: "四川",
  52: "贵州",
  53: "云南",
  54: "西藏 ",
  61: "陕西",
  62: "甘肃",
  63: "青海",
  64: "宁夏",
  65: "新疆",
  71: "台湾",
  81: "香港",
  82: "澳门",
  91: "国外",
};

export const isIdCard = (cardNo: string) => {
  // Rules.add('idcard', function(el, value, label, errorMsg){
  let value = cardNo.toLocaleUpperCase();
  if (citys[value.substr(0, 2)] === undefined) {
    return false;
  } // 非法地区
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value)) {
    // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    // 下面分别分析出生日期和校验位
    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const arrCh = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
    if (citys[value.substr(0, 2)] === undefined) {
      return false;
    }
    if (value.length === 15) {
      const arrSplit =
        value.match(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/) || "";
      // 检查生日日期是否正确
      const dtmBirth = new Date(
        `19${arrSplit[2]}/${arrSplit[3]}/${arrSplit[4]}`
      );
      if (dtmBirth.toString() !== "Invalid Date") {
        // 将15位身份证转成18位
        // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        let nTemp = 0;
        value = `${value.substr(0, 6)}19${value.substr(6, value.length - 6)}`;
        for (let i = 0; i < 17; i++) {
          nTemp += parseInt(value.substr(i, 1), 10) * arrInt[i];
        }
        value += arrCh[nTemp % 11];
      }
    }
    if (value.length === 18) {
      const arrSplit =
        value.match(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/) || "";
      // 检查生日日期是否正确
      const dtmBirth = new Date(`${arrSplit[2]}/${arrSplit[3]}/${arrSplit[4]}`);
      if (dtmBirth.toString() !== "Invalid Date") {
        // 检验18位身份证的校验码是否正确。
        // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        let nTemp = 0;
        for (let i = 0; i < 17; i++) {
          nTemp += parseInt(value.substr(i, 1), 10) * arrInt[i];
        }
        const valnum = arrCh[nTemp % 11];
        if (valnum === value.substr(17, 1)) {
          return true;
        }
      }
    }
  }
  return false;
};
/** 根据身份证自动获取生日 */
export const getBirthdayForIdCard = (cardNo: string) => {
  let tmpStr = "";
  if (cardNo.length === 15) {
    tmpStr = cardNo.substring(6, 12);
    tmpStr = `19${tmpStr}`;
    tmpStr = `${tmpStr.substring(0, 4)}-${tmpStr.substring(
      4,
      6
    )}-${tmpStr.substring(6)}`;
  } else {
    tmpStr = cardNo.substring(6, 14);
    tmpStr = `${tmpStr.substring(0, 4)}-${tmpStr.substring(
      4,
      6
    )}-${tmpStr.substring(6)}`;
  }
  return tmpStr;
};

type Sex = "M" | "F" | "";
/** 根据身份证自动获取性别 */
export const getGenderForIdCard = (cardNo: string): Sex => {
  let seXType: Sex = "";
  const isFemale = parseInt(
    cardNo.length > 15 ? cardNo.substr(16, 1) : cardNo.substr(14, 1),
    10
  );
  if (isFemale % 2) {
    seXType = "M";
  } else {
    seXType = "F";
  }
  return seXType;
};
