import request from "@/utils/request";


export function apiGetAllMyShitRecords() {
    return request({
        url: "/api/shit/getAllMyShitRecords",
        method: "get"
    });
}

export function apiGetShitRecordsOfAllUsersRecently() {
    return request({
        url: "/api/shit/getShitRecordsOfAllUsersRecently",
        method: "get"
    });
}
export function apiRecordShitTime(shitTimeObj) {
    return request({
        url: "/api/shit/recordOnce",
        method: "post",
        data: shitTimeObj
    });
}
