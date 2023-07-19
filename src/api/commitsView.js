import request from '@/utils/request'

 
export function apiQueryAllCommitOfMine() {
    return request({
        url: '/api/heatmap/getMyCommitHeatMap',
        method: 'get'
    })
}