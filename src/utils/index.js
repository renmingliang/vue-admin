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
