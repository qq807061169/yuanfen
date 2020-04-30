import code from './api/code'

export default {
    code
};


/**
 * 1.在main.js引入该文件   import api form ''
 * 2.可以将api设置到Vue的原型上   Vue.prototype.$api = api
 * 3.具体接口请求可以设置在api目录下对应的文件，设置好后，需要在api.js引入导出
 * 4.调用  this.$api.code.getAuthCodeImg().then().catch() 这种形式，code对象下的方法，也可以直接返回方法，但应该需要避免方法名相同
 */