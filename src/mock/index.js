import Mock from 'mockjs'
import loginAPI from './login'

// 登录相关
Mock.mock(/\/site\/get-token/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/site\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/permission\.*/, 'post', loginAPI.getUserInfo)
Mock.mock(/\/menu\/all\.*/, 'post', loginAPI.getUserInfo)

export default Mock
