/**
 * 获取表单结构数据中指定参数的值
 */
export function getQueryString (str, name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = str.match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return ''
}

/**
 * 表单数据转JSON对象
 */
export function param2Obj(str) {
  if (!str) { return {} }
  return JSON.parse('{"' + decodeURIComponent(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

/**
 * localStorage
 */
export const local = {
  set: function (key, val) {
    localStorage.setItem(key, JSON.stringify(val))
  },
  get: function (key) {
    const res = localStorage.getItem(key)
    if (res) {
      return JSON.parse(res)
    } else {
      return res
    }
  },
  remove: function (key) {
    localStorage.removeItem(key)
  }
}
