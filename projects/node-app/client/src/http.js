import axios from 'axios'
import {Message,Loading} from 'element-ui'

let loading;
function startLoading() {
    loading=Loading.service({
        lock:true,
        text:'冲鸭鸭鸭鸭',
        background:'rgba(0,0,0,0.7)',
    })
}

function endloading() {
    loading.close()
}
//请求拦截
axios.interceptors.request.use(config=>{
    //加载动画
    startLoading();
    return config;
},error => {
    return Promise.reject(error)
});

//响应拦截
axios.interceptors.response.use(response=>{
    //结束加载动画
    endloading();
    return response;
},error => {
    //错误提醒
    endloading();
    Message.error(error.response.data);
    return Promise.reject(error)
});

export default axios;
