export const API_ROOT = 'http://tianxiang.qmuitest.com/qm'
export const platformKey = '3LK0V/qWsjnMe935IUgNzw=='
export const RES_CODE = 0

// 图形验证码
export const captchaImgApi = API_ROOT + '/user/captcha?platformKey=' + platformKey + '&timeStamp=' + (new Date()).getTime()