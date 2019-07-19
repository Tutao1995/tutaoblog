let commonFunc = {



// 1.类型检测类
//字符串
isString(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}
//数字
, isNumber(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
}
//对象
, isObject(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}
//数组
, isArray(o) {
  return Object.prototype.toString.call(o), sllice(8, -1) === 'Array'
}
//手机类型
, mobileType() {
  let u = navigator.userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux' > -1)) {
    return 'Android'
  } else if (u.indexOf('iPhone') > -1) {
    return 'iPhone'
  } else if (u.indexOf('iPad') > -1) {
    return 'iPad'
  }
}
//字符串检测
, strCheck(str, type) {
  switch (type) {
    case 'phone': //手机号
      return /^1[3|4|5|6|7|8|][0-9]{9}$/.test(str);
    case 'tel': //座机
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case 'card': //身份证
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
    case 'pwd':
      return /^[a-zA-z]\w{5,17}$/.test(str);
    case 'email':
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case 'number':
      return /^[0-9]{6}$/.test(str)
  }
}

//日期类
//格式化
, timeFormat(obj) {
  let temDate = obj.date || new Date(),
    format = obj.format || "-";
  // let y = temDate.getFullYear(),
  // m = temDate.getMonth() + 1 > 9 ? temDate.getMonth() + 1 : '0' + temDate.getMonth() + 1,
  // d = temDate.getDate() > 9 ? temDate.getDate() : '0' + temDate.getDate(),
  // h = temDate.getHours() > 9 ? temDate.getHours() : '0' + temDate.getHours(),
  // mi = temDate.getMinutes > 0 ? temDate.getMinutes : '0' + temDate.getMinutes,
  // s = temDate.getSeconds() > 9 ? temDate.getSeconds() : '0' + temDate.getSeconds();
  let y = temDate.getFullYear(),
    m = this.compareNine(temDate.getMonth() + 1),
    d = this.compareNine(temDate.getDate()),
    h = this.compareNine(temDate.getHours()),
    mi = this.compareNine(temDate.getMinutes()),
    s = this.compareNine(temDate.getSeconds());
  return y + format + m + format + d + " " + h + ":" + mi + ":" + s
}

, compareNine(val) {
  return val > 9 ? val : '0' + val
}
//日期比较大小
, timeCompare(one, two) {
  let oneDate = new Date(Date.parse(one));
  let twoDate = new Date(Date.parse(two));
  return oneDate < twoDate
}
//一周以前
, beforeWeekDate(date, format) {
  let temDate = date || new Date();
  if (!(temDate instanceof Date)) {
    temDate = new Date(temDate.replace(/-/g, '/'));
  }
  let temDateTime = temDate.getTime(),
    weekDate = new Date(temDateTime - 7 * 24 * 60 * 60 * 1000);
  return timeFormat(weekDate, format)
}
//数组类
//判断一个元素是否在数组内
, contains(str, arr) {
  return arr.indexOf(str) > -1
}
//封装map
, myMap(arr, fn, thisObj) {
  let scope = thisObj || window,
    returnArray = [];
  for (let i = 0, j = arr.length; i < j; i++) {
    let res = fn.call(scope, arr[i], i, this);
    if (res != null) {
      returnArray.push(res)
    }
  }
  return returnArray;
}
//封装 each
, myEach(arr, fn) {
  let returnArray = [],
    _fn = fn || Function;
  let args = Array.prototype.slice.call(arguments, 1);
  for (let i = 0, j = arr.length; i < j; i++) {
    let res = fn.apply(arr, [arr[i], i].concat(args))
    if (res != null) {
      returnArray.push(res)
    }
  }
}
//排序 1 升序 2 降序 3 随机 4 自己
, mySort(arr, type) {
  let arrLen = arr.length;
  if (arrLen === 0 || arrLen === 1) {
    return arr;
  }
  return arr.sort(function (a, b) {
    switch (type) {
      case 1:
        return a - b;
      case 2:
        return b - a;
      case 3:
        return Math.random() - 0.5;
      default:
        return arr
    }
  })
}
//去重
, myUinique(arr) {
  if (Array.hasOwnProperty('from')) {
    return Array.from(new Set(arr))
  } else {
    let a = [],
      o = {};
    for (let i = 0, j = arr.length; i < j; i++) {
      if (!o[arr[i]]) {
        o[arr[i]] = true;
        a.push(arr[i])
      }
    }
    return a
  }
}
//最大值
, myMax(arr) {
  return Math.max.apply(null, arr)
}
//最小值
, myMin(arr) {
  return Math.min.apply(null, arr)
}
//类数组 -> 数组
, arrLikeToArr(arrLike) {
  let arr = [];
  if (Array.isArray(arrLike)) {
    arr = arrLike
  } else {
    arr = Array.prototype.slice.call(arrLike)
  }
  return arr;
}

//string类
//去空格 1 所有 2 前后 3 前 4 后
, myTrim(str, tp) {
  let type = tp || 1;
  switch (type) {
    case 1:
      return str.replace(/s+/g, '')
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, '')
    case 3:
      return str.replace(/(^\s*)/g, '')
    case 4:
      return str.replace(/(\s*$)/g, '')
  }
}
//大小写变化 1:首字母大写 2：首页母小写 3：大小写转换 4：全部大写 5：全部小写
, changeCase(str, tp) {
  let type = tp || 1;
  switch (type) {
    case 1:
      return str.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
      })
    case 2:
      return str.replace(/\b\w+\b/g / g, function(word) {
        return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
      })
    case 3:
      return str.split('').map(function (word) {
        if (/[a-z]/.test(word)) {
          return word.toUpperCase()
        } else {
          return word.toLowerCase()
        }
      }).join('');
    case 4:
      return str.toUpperCase();
    case 5:
      return str.toLowerCase();
  }
}
//密码强度
, pwdCheck(str) {
  let LV = 0;
  if (str.length < 6) {
    return Lv;
  }
  if (/[0,9]/.test(str)) {
    return LV++
  }
  if (/[a-z]/.test(str)) {
    return LV++
  }
  if (/[A-Z]/.test(str)) {
    return LV++
  }
  if (/[\.|-|_]/.test(str)) {
    return LV++
  }
  return LV++
}
//number类
//随机数
, randomNumber(min, max) {
  if (arguments.length === 2) {
    return Math.floor(min + Math.random() * (max + 1 - min))
  } else {
    return null
  }
}
//补零 position:1 前 2 后 _length 返回的数据长度
, addZero(param, _length, position) {
  let len = param + "",
    dataArr = len.split(""),
    lenHandle = dataArr.length,
    num = _length - lenHandle;
  if (num < 0) {
    return param;
  }
  for (let i = 0; i < num; i++) {
    if (position === 1) {
      dataArr.unshift("0")
    } else if (position === 2) {
      dataArr.push("0")
    }
  }
  let nowData = dataArr.join("");
  return nowData;
}

//存储类
, setSession(name, val) {
  return sessionStorage.setItem(name, val)
}

, getSession(name) {
  return sessionStorage.getItem(name)
}

, setCookie(name, val, time) {
  let setting = arguments[0];
  if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
    for (let i in setting) {
      let oDate = new Date();
      oDate.setDate(oDate.getDate() + time);
      document.cookie = name + '=' + val + ';expires=' + oDate;
    }
  } else {
    let oDate = new Date();
    oDate.setDate(oDate.getDate() + time);
    document.cookie = name + '=' + val + ';expires=' + oDate;
  }
}

, getCookie(name) {
  let arr = document.cookie.split(';');
  for (let i = 0, j = arr.length; i < j; i++) {
    let arr2 = arr[i].split('=');
    if (arr2[0] === name) {
      return arr2[1]
    }
  }
}

//防抖
//节流
//监听input框
//倒计时
//事件绑定，监听，解绑
//事件冒泡 阻止冒泡 阻止默认行为

, debounce(func, wait) {
  let timeout;
  return function () {
      let context = this;
      let args = arguments;

      if (timeout) clearTimeout(timeout);
      
      timeout = setTimeout(() => {
          func.apply(context, args)
      }, wait);
  }
}
}

export default commonFunc