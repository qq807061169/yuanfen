// import service from './request'
// 
// export default const getPersonInfo = data => {
//     return service({
//         url: '?i=10&c=entry&do=menses&m=ewei_shop&p=login',
//         method: 'post',
//         data
//     })
// };
// 
//api.js
import service from './request'
 
export const getPersonInfo = data => {
    return service({
        url: '?i=10&c=entry&do=menses&m=ewei_shop&p=login',
        method: 'post',
        data
    })
};
