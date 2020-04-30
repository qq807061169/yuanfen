import axios from 'axios'

var instance = axios.create({
    timeout: 1000 * 12, // 请求超时时间
    responseType: 'JSON' // 数据返回类型
});

// 上线全局请求配置
if (process.env.NODE_ENV == 'development') {
    // 开发域名
    instance.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'debug') {
    // 测试域名
    instance.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
    // 线上域名
    instance.defaults.baseURL = 'https://weixin.kknabc.com/app/index.php';
}

// http request 拦截器
instance.interceptors.request.use(
    config => {
        // 这里是全局设置，将Token设置到Request Headers
        if (sessionStorage.authorization) {
            config.headers["Authorization-Token"] = `Bearer; ${sessionStorage.authorization}`
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
)
// http response 拦截器
instance.interceptors.response.use(
    response => {
        // 这里是获取Token，因为我这边Token是在Response Headers返回的，所以在这里最方便
        if (response.headers.authorization) {
            sessionStorage.authorization = response.headers.authorization
        }
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                // 如果后端返回没有权限
                case 401:
                    router.replace("/index")
            }
        }
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    }
)

export default instance;
