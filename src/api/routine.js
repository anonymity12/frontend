import request from '@/utils/request'

export function apiAddRoutine(routineObject) {
    return request ({
        url: '/api/routine/addRoutine',
        method: 'post',
        data: routineObject
    })
}
export function apiDeleteRoutine(routineId) {
    return request({
        url: '/api/routine/deleteRoutine',
        method: 'delete',
        data: routineId
    })
}

export function apiUpdateRoutine(routineData) {
    return request({
        url: '/api/routine/updateRoutine',
        method: 'post',
        data: routineData
    })
}

export function apiQueryAllRoutineOfMine() {
    return request({
        url: '/api/routine/queryAll',
        method: 'get'
    })
}