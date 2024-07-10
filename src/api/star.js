import request from "@/utils/request";
/*
star sql fields: 
id
owner
starDateTime
starDescription
*/

export function apiGetAllMyStarRecords() {
    return request({
        url: "/api/star/getAllMyStarRecords",
        method: "get"
    });
}

export function apiGetStarRecordsOfAllUsersRecently() {
    return request({
        url: "/api/star/getStarRecordsOfAllUsersRecently",
        method: "get"
    });
}
export function apiRecordOneStar(starObj) {
    return request({
        url: "/api/star/recordOnce",
        method: "post",
        data: starObj
    });
}

export function apiGetStarRaceBayData() {
    return request({
        url: "/api/star/getStarWeeklyData",
        method: "get"
    });
}

export function apiGetStarWeeklyData() {
    return request({
        url: "/api/star/getStarWeeklyData",
        method: "get"
    });
}

export function apiGetStarRoad() {
    return request({
        url: "/api/star/getStarRoad",
        method: "get"
    });
}

