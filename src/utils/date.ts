/**
 * 获取日期
 * @param dateStr 日期、字符串、数字
 */
export const getDate = (dateStr): Date | undefined => {
  if (dateStr == null) {
    return undefined;
  }

  let targetStr = dateStr;
  let type = Object.prototype.toString.call(dateStr);
  if (type === "[object Date]") {
    return dateStr;
  } else if (type === "[object String]") {
    // yyyy-mm-dd的兼容性不好
    const arr = dateStr.split(/[- :]/);
    let date =
      arr.length >= 3
        ? new Date(
            arr[0],
            arr[1] - 1,
            arr[2],
            arr[3] || 0,
            arr[4] || 0,
            arr[5] || 0
          )
        : new Date(dateStr);
    if (Number.isNaN(date.getDate())) {
      return undefined;
    }

    return date;
  }

  return new Date(targetStr);
};

/**
 * 格式化日期
 * @param date 日期
 * @param style 格式，1: yyyy-mm-dd, 2: yyyy-mm-dd hh:mm:ss
 */
export const formateDate = (dateObj, style = 1, hourDiff = 0) => {
  if (dateObj == null || dateObj === "") {
    console.log("formateDate 的 date 参数为空");
    return "";
  }
  if (
    !["[object String]", "[object Date]", "[object Number]"].includes(
      Object.prototype.toString.call(dateObj)
    )
  ) {
    console.log("formateDate 的 date 参数不合法");
    return "";
  }

  let date = getDate(dateObj);
  if (!date) {
    return "";
  }

  if (hourDiff) {
    date.setHours(date.getHours() + hourDiff);
  }

  let year: string | number = date.getFullYear();
  let month: string | number = date.getMonth() + 1;
  let day: string | number = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  if (style === 1) {
    return `${year}-${month}-${day}`;
  } else if (style === 2) {
    let hours: string | number = date.getHours();
    if (hours < 10) {
      hours = "0" + hours;
    }
    let minutes: string | number = date.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    let seconds: string | number = date.getSeconds();
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return `${year}-${month}-${day}`;
};

/**
 * 根据生日获取周岁
 * @param strBirthday 出生日期
 */
export const getFullAge = (strBirthday: any) => {
  let returnAge: number = 0;

  let birthDate = getDate(strBirthday);
  if (!birthDate) {
    return returnAge;
  }
  let birthYear = birthDate.getFullYear();
  let birthMonth = birthDate.getMonth() + 1;
  let birthDay = birthDate.getDate();

  let d = new Date();
  let nowYear = d.getFullYear();
  let nowMonth = d.getMonth() + 1;
  let nowDay = d.getDate();

  if (nowYear == birthYear) {
    returnAge = 0; //同年 则为0岁
  } else {
    let ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        let dayDiff = nowDay - birthDay; //日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        let monthDiff = nowMonth - birthMonth; //月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge; //返回周岁年龄
};

type DateDiff = Record<"day" | "hour" | "minute" | "second", string>;
/**
 * 获取时间差
 * @param timeValue 时间差，数值为毫秒
 */
export const getDateSpan = (timeValue): DateDiff => {
  let result: DateDiff = {
    day: "00",
    hour: "00",
    minute: "00",
    second: "00",
  };

  if (Object.prototype.toString.call(timeValue) !== "[object Number]") {
    console.log("getDateSpan 的 timeValue 参数不合法", timeValue);
    return result;
  }
  const day = Math.floor(timeValue / (1000 * 60 * 60 * 24));
  const hour = Math.floor(
    (timeValue - day * 1000 * 60 * 60 * 24) / (1000 * 60 * 60)
  );
  const minute = Math.floor(
    (timeValue - day * 1000 * 60 * 60 * 24 - hour * 1000 * 60 * 60) /
      (1000 * 60)
  );
  const second = Math.floor(
    (timeValue -
      day * 1000 * 60 * 60 * 24 -
      hour * 1000 * 60 * 60 -
      minute * 1000 * 60) /
      1000
  );

  result.second = String(second).padStart(2, "0");
  result.minute = String(minute).padStart(2, "0");
  result.hour = String(hour).padStart(2, "0");
  result.day = String(day).padStart(2, "0");

  return result;
};
