import base from '../base'
import axios from '../http'
import qs from 'qs'


const code = {
    getAuthCodeImg(client, timestamp, uid) {
        let data = {
            params: {
                timestamp: timestamp / 1000,
                _: uid,
                client: client
            }
        };
        return axios.get(`${base.baseurl}/?i=10&c=entry&do=menses&m=ewei_shop&p=login`, data);
    },
	//登录
    logo(openids){
        let data = {
			// oFKnZwSbL2Zhd_jSD8Qv5QTVduc8
            openid: openids
        }
        return axios.post(`${base.baseurl}/?i=10&c=entry&do=menses&m=ewei_shop&p=login`,qs.stringify(data))
    }, 
    calendar(userid){
		let data = {
			user_id:userid,
		}
		return axios.post(`${base.baseurl}/?i=10&c=entry&do=menses&m=ewei_shop&p=calendar`,qs.stringify(data))
	},
	//爱爱记录
	loveRecord(userid,sex_time,op){
		let data = {
			user_id:userid,
			sex_time:sex_time,
			op:op
		}
		return axios.post(`${base.baseurl}/?i=10&c=entry&do=menses&m=ewei_shop&p=set`,qs.stringify(data))
	},
	//统计
	statistical(userid,op){
		let data = {
			user_id:userid,
			op:op
		}
		return axios.post(`${base.baseurl}/?i=10&c=entry&do=menses&m=ewei_shop&p=statistics`,qs.stringify(data))
	},
	//首页
	indexs(userid){
		let data = {
			user_id:userid
		}
		return axios.post(`${base.baseurl}/?i=10&c=entry&do=menses&m=ewei_shop&p=index`,qs.stringify(data))
	},
	//个人设置
	info(userid,menses_last_time,menses_apart_days,menses_continued_days,op){
		let data = {
			user_id:userid,
			menses_last_time:menses_last_time,
			menses_apart_days:menses_apart_days,
			menses_continued_days:menses_continued_days,
			op:op,
		}
		return axios.post(`${base.baseurl}/?i=10&c=entry&do=menses&m=ewei_shop&p=set`,qs.stringify(data))
	},
	//提醒
	record(userid,op){
		let data = {
			user_id:userid,
			op:op
		}
		return axios.post(`${base.baseurl}/?i=10&c=entry&do=menses&m=ewei_shop&p=statistics`,qs.stringify(data))
	},
	remind(userid,remind_type,op){
		let data = {
			user_id:userid,
			remind_type:remind_type,
			op:op,
		}
		return axios.post(`${base.baseurl}/?i=10&c=entry&do=menses&m=ewei_shop&p=set`,qs.stringify(data))
	},
	//我的设置
	setsave(userid,menses_last_date,menses_apart_days,menses_continued_days,op){
		let data = {
			user_id:userid,
			menses_last_time:menses_last_date,
			menses_apart_days:menses_apart_days,
			menses_continued_days:menses_continued_days,
			op:op,
		}
		return axios.post(`${base.baseurl}/?i=10&c=entry&do=menses&m=ewei_shop&p=set`,qs.stringify(data))
	},
	
	setinfos(userid,op){
		let data = {
			user_id:userid,
			op:op
		}
		return axios.post(`${base.baseurl}/?i=10&c=entry&do=menses&m=ewei_shop&p=set`,qs.stringify(data))
	}
// 	infotips(userid,remind_type,op){
// 		let data = {
// 			user_id:userid,
// 			remind_type:remind_type,
// 			op:op,
// 		}
// 		return axios.post(`${base.baseurl}/?i=10&c=entry&do=menses&m=ewei_shop&p=set`,qs.stringify(data))
// 	}



	
}
// 最好是直接让后端设置跨域，而不是你这边
// 不然前端每次都要去找跨域，很麻烦的
export default code;