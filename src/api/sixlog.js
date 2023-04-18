import request from '@/utils/request'
import qs from 'qs';

export function apiLikeASixLog(sixLogId) {
    return request({
        url: '/api/sixlog/likeSixLog',
        method: 'post',
        data: qs.stringify(sixLogId)
    })
}